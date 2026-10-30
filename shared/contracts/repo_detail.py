"""Respuesta HTTP de ficha. Propuesta local: compone contratos existentes."""
from pydantic import BaseModel, Field, model_validator
from shared.contracts.repo import Repo
from shared.contracts.integration_idea import IntegrationIdea


class RepoDetail(BaseModel):
    repo: Repo
    integration_ideas: list[IntegrationIdea] = Field(default_factory=list, max_length=3)

    @model_validator(mode="after")
    def check_ideas(self):
        if any(idea.full_name != self.repo.full_name for idea in self.integration_ideas):
            raise ValueError("idea de integración de otro repositorio")
        if self.repo.archived and self.integration_ideas:
            raise ValueError("un repositorio archivado no debe incluir ideas")
        return self
