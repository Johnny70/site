# ============================================================
# MODULE: tests/test_public
# RESPONSIBILITY: Tests for all public GET endpoints in server/routes/public
# DEPENDS ON: pytest, fastapi.testclient, unittest.mock
# EXPOSES: nothing
# ============================================================

from unittest.mock import patch
from fastapi.testclient import TestClient

MOCK_PROJECT = {
    'slug': 'test-project',
    'title': 'Test Project',
    'shortDescription': 'A short description',
    'type': 'Web',
    'status': 'Live',
    'scope': 'Small',
    'context': 'Test context',
    'problem': 'Test problem',
    'approach': 'Test approach',
    'systemDesign': {
        'input': 'x',
        'processing': 'y',
        'output': 'z',
        'constraints': 'none',
    },
    'tech': 'Python, React',
    'result': 'Test result',
    'notes': 'Test notes',
    'designPrinciple': 'Test principle',
}

MOCK_NOW = {
    'focus': 'Building tests',
    'direction': 'Forward',
    'availability': 'Open',
}

MOCK_LAB = [{'experiment': 'Test experiment', 'result': 'Pass'}]

MOCK_HOME = {
    'tagline': 'Test tagline',
    'description1': 'Description one',
    'description2': 'Description two',
    'nowBuilding': 'Tests',
    'nowExploring': 'Pytest',
    'nowAvailability': 'Open',
    'approachIntro': 'Approach intro',
    'approachPoints': ['Point one', 'Point two'],
    'approachSuffix': 'Approach suffix',
}

MOCK_CONTACT = {
    'email': 'test@example.com',
    'github': 'https://github.com/test',
    'linkedin': '',
}

MOCK_ABOUT = {
    'paragraphs': ['First paragraph', 'Second paragraph'],
}


def test_health(client: TestClient) -> None:
    response = client.get('/api/health')

    assert response.status_code == 200
    assert response.json() == {'status': 'ok'}


def test_get_projects_returns_list(client: TestClient) -> None:
    with patch('server.routes.public.read_json', return_value=[MOCK_PROJECT]):
        response = client.get('/api/projects')

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]['slug'] == 'test-project'


def test_get_project_by_slug_returns_project(client: TestClient) -> None:
    with patch('server.routes.public.read_json', return_value=[MOCK_PROJECT]):
        response = client.get('/api/projects/test-project')

    assert response.status_code == 200
    assert response.json()['title'] == 'Test Project'


def test_get_project_by_slug_returns_404_when_not_found(client: TestClient) -> None:
    with patch('server.routes.public.read_json', return_value=[]):
        response = client.get('/api/projects/nonexistent')

    assert response.status_code == 404


def test_get_now_returns_content(client: TestClient) -> None:
    with patch('server.routes.public.read_json', return_value=MOCK_NOW):
        response = client.get('/api/now')

    assert response.status_code == 200
    assert response.json()['focus'] == 'Building tests'


def test_get_lab_returns_list(client: TestClient) -> None:
    with patch('server.routes.public.read_json', return_value=MOCK_LAB):
        response = client.get('/api/lab')

    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_home_returns_content(client: TestClient) -> None:
    with patch('server.routes.public.read_json', return_value=MOCK_HOME):
        response = client.get('/api/home')

    assert response.status_code == 200
    assert response.json()['tagline'] == 'Test tagline'


def test_get_contact_returns_content(client: TestClient) -> None:
    with patch('server.routes.public.read_json', return_value=MOCK_CONTACT):
        response = client.get('/api/contact')

    assert response.status_code == 200
    assert response.json()['email'] == 'test@example.com'


def test_get_about_returns_paragraphs(client: TestClient) -> None:
    with patch('server.routes.public.read_json', return_value=MOCK_ABOUT):
        response = client.get('/api/about')

    assert response.status_code == 200
    assert response.json()['paragraphs'] == ['First paragraph', 'Second paragraph']
