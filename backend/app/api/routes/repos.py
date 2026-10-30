from fastapi import APIRouter, HTTPException
from backend.app.repositories import repos
from shared.contracts.repo import Repo
from shared.contracts.repo_detail import RepoDetail

router = APIRouter(tags=["repos"])


@router.get("/repos", response_model=list[Repo])
def list_repos():
    return repos.list_repos()


@router.get("/repos/{owner}/{name}", response_model=RepoDetail)
def get_repo(owner: str, name: str):
    repo = repos.get_repo(f"{owner}/{name}")
    if repo is None:
        raise HTTPException(404, "Herramienta no encontrada")
    # El dataset actual no contiene ideas persistidas.
    return RepoDetail(repo=repo, integration_ideas=[])
