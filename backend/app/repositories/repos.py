"""Fuente de ejemplo del equipo, validada por los contratos compartidos."""
from ai.catalog import load_repos


def list_repos():
    return load_repos()


def get_repo(full_name: str):
    return next((repo for repo in list_repos() if repo.full_name == full_name), None)
