"""Configuración explícita; no abre conexiones al importar."""
from dataclasses import dataclass, field
import os


@dataclass(frozen=True)
class Settings:
    database_url: str | None = field(default=None, repr=False)
    cors_origins: tuple[str, ...] = ()

    @classmethod
    def from_env(cls) -> "Settings":
        return cls(
            database_url=os.getenv("DATABASE_URL") or None,
            cors_origins=tuple(
                origin.strip()
                for origin in os.getenv("CORS_ORIGINS", "").split(",")
                if origin.strip()
            ),
        )
