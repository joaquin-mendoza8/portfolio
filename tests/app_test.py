import pytest
import sys
import os

# Add the project root directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from src.index import app

# Create a fixture to test the app
@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()

    yield client

# Test the index page
def test_index(client):
    response = client.get('/')
    assert response.status_code == 200

# Test the experience page
def test_experience(client):
    response = client.get('/experience')
    assert response.status_code == 200

# Test the projects page
def test_projects(client):
    response = client.get('/projects')
    assert response.status_code == 200