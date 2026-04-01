# ============================================================
# MODULE: tests/test_admin
# RESPONSIBILITY: Tests for auth and all admin CRUD endpoints in server/routes/admin
# DEPENDS ON: pytest, fastapi.testclient, unittest.mock
# EXPOSES: nothing
# ============================================================

from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient

MOCK_PROJECT = {
    'slug': 'test-project',
    'title': 'Test Project',
    'shortDescription': 'Short description',
    'type': 'Web',
    'status': 'Live',
    'scope': 'Small',
    'context': 'Context',
    'problem': 'Problem',
    'approach': 'Approach',
    'systemDesign': {
        'input': 'x',
        'processing': 'y',
        'output': 'z',
        'constraints': 'none',
    },
    'tech': 'Python',
    'result': 'Result',
    'notes': 'Notes',
    'designPrinciple': 'Principle',
}


# --- Auth ---

def test_ping_with_valid_token_returns_ok(client: TestClient, auth_headers: dict[str, str]) -> None:
    response = client.get('/api/admin/ping', headers=auth_headers)

    assert response.status_code == 200
    assert response.json() == {'status': 'ok'}


def test_ping_without_token_returns_403(client: TestClient) -> None:
    response = client.get('/api/admin/ping')

    assert response.status_code == 403


def test_ping_with_wrong_token_returns_401(client: TestClient) -> None:
    response = client.get('/api/admin/ping', headers={'Authorization': 'Bearer wrong-token'})

    assert response.status_code == 401


# --- Projects ---

def test_create_project_returns_201(client: TestClient, auth_headers: dict[str, str]) -> None:
    mock_write: MagicMock = MagicMock()
    with patch('server.routes.admin.read_json', return_value=[]), \
         patch('server.routes.admin.write_json', mock_write):
        response = client.post('/api/admin/projects', json=MOCK_PROJECT, headers=auth_headers)

    assert response.status_code == 201
    assert response.json()['slug'] == 'test-project'
    mock_write.assert_called_once()


def test_create_project_with_duplicate_slug_returns_409(
    client: TestClient, auth_headers: dict[str, str]
) -> None:
    with patch('server.routes.admin.read_json', return_value=[MOCK_PROJECT]):
        response = client.post('/api/admin/projects', json=MOCK_PROJECT, headers=auth_headers)

    assert response.status_code == 409


def test_update_project_returns_updated_data(client: TestClient, auth_headers: dict[str, str]) -> None:
    updated = {**MOCK_PROJECT, 'title': 'Updated Title'}
    mock_write: MagicMock = MagicMock()
    with patch('server.routes.admin.read_json', return_value=[MOCK_PROJECT]), \
         patch('server.routes.admin.write_json', mock_write):
        response = client.put(
            f'/api/admin/projects/{MOCK_PROJECT["slug"]}',
            json=updated,
            headers=auth_headers,
        )

    assert response.status_code == 200
    assert response.json()['title'] == 'Updated Title'
    mock_write.assert_called_once()


def test_update_project_returns_404_when_not_found(
    client: TestClient, auth_headers: dict[str, str]
) -> None:
    with patch('server.routes.admin.read_json', return_value=[]):
        response = client.put(
            '/api/admin/projects/nonexistent',
            json=MOCK_PROJECT,
            headers=auth_headers,
        )

    assert response.status_code == 404


def test_delete_project_returns_204(client: TestClient, auth_headers: dict[str, str]) -> None:
    mock_write: MagicMock = MagicMock()
    with patch('server.routes.admin.read_json', return_value=[MOCK_PROJECT]), \
         patch('server.routes.admin.write_json', mock_write):
        response = client.delete(
            f'/api/admin/projects/{MOCK_PROJECT["slug"]}',
            headers=auth_headers,
        )

    assert response.status_code == 204
    mock_write.assert_called_once_with('projects.json', [])


def test_delete_project_returns_404_when_not_found(
    client: TestClient, auth_headers: dict[str, str]
) -> None:
    with patch('server.routes.admin.read_json', return_value=[]):
        response = client.delete('/api/admin/projects/nonexistent', headers=auth_headers)

    assert response.status_code == 404


# --- Now ---

def test_update_now_saves_and_returns_content(
    client: TestClient, auth_headers: dict[str, str]
) -> None:
    now_data = {'focus': 'New focus', 'direction': 'New direction', 'availability': 'Closed'}
    mock_write: MagicMock = MagicMock()
    with patch('server.routes.admin.write_json', mock_write):
        response = client.put('/api/admin/now', json=now_data, headers=auth_headers)

    assert response.status_code == 200
    assert response.json() == now_data
    mock_write.assert_called_once_with('now.json', now_data)


# --- Lab ---

def test_update_lab_saves_and_returns_entries(
    client: TestClient, auth_headers: dict[str, str]
) -> None:
    lab_data = [{'experiment': 'New experiment', 'result': 'New result'}]
    mock_write: MagicMock = MagicMock()
    with patch('server.routes.admin.write_json', mock_write):
        response = client.put('/api/admin/lab', json=lab_data, headers=auth_headers)

    assert response.status_code == 200
    assert response.json() == lab_data
    mock_write.assert_called_once()


# --- Contact ---

def test_update_contact_saves_and_returns_content(
    client: TestClient, auth_headers: dict[str, str]
) -> None:
    contact_data = {
        'email': 'new@example.com',
        'github': 'https://github.com/new',
        'linkedin': '',
    }
    mock_write: MagicMock = MagicMock()
    with patch('server.routes.admin.write_json', mock_write):
        response = client.put('/api/admin/contact', json=contact_data, headers=auth_headers)

    assert response.status_code == 200
    assert response.json()['email'] == 'new@example.com'
    mock_write.assert_called_once()


# --- About ---

def test_update_about_saves_and_returns_paragraphs(
    client: TestClient, auth_headers: dict[str, str]
) -> None:
    about_data = {'paragraphs': ['Updated paragraph one', 'Updated paragraph two']}
    mock_write: MagicMock = MagicMock()
    with patch('server.routes.admin.write_json', mock_write):
        response = client.put('/api/admin/about', json=about_data, headers=auth_headers)

    assert response.status_code == 200
    assert response.json()['paragraphs'] == ['Updated paragraph one', 'Updated paragraph two']
    mock_write.assert_called_once()
