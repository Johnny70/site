# ============================================================
# MODULE: tests/conftest
# RESPONSIBILITY: Shared pytest fixtures for all test modules
# DEPENDS ON: fastapi, server/app, server/auth
# EXPOSES: client, auth_headers, test_token
# ============================================================

import os
import pytest
from fastapi.testclient import TestClient
from server.app import app

TEST_TOKEN = 'test-secret-token-abc'


@pytest.fixture(autouse=True)
def set_admin_token() -> None:
    """Set ADMIN_TOKEN env var before every test and remove it after."""
    os.environ['ADMIN_TOKEN'] = TEST_TOKEN
    yield
    del os.environ['ADMIN_TOKEN']


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)


@pytest.fixture
def auth_headers() -> dict[str, str]:
    return {'Authorization': f'Bearer {TEST_TOKEN}'}
