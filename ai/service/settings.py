"""Variables del servicio del asistente, leídas del entorno al arrancar."""

import os
from dataclasses import dataclass

# Orígenes del frontend en local (puerto 4173, con localhost o con 127.0.0.1).
DEFAULT_CORS_ORIGINS = ("http://localhost:4173", "http://127.0.0.1:4173")

# De dónde lee el catálogo al arrancar: lo publicado en la base (lo mismo que muestra la ficha)
# o los archivos de ai/data/catalog/ (la vuelta atrás). Solo lo lee el servicio: las
# evaluaciones usan siempre los archivos.
CATALOG_SOURCES = ("database", "files")

# Cada cuántos minutos revisa si se publicó algo nuevo en la base (0 = solo al arrancar).
DEFAULT_RELOAD_MINUTES = 10


@dataclass(frozen=True)
class Settings:
    cors_origins: tuple[str, ...] = DEFAULT_CORS_ORIGINS
    catalog_source: str = "database"
    reload_minutes: int = DEFAULT_RELOAD_MINUTES

    @classmethod
    def from_env(cls) -> "Settings":
        """AI_CORS_ORIGINS: orígenes separados por comas; sin definir, los de local.
        AI_CATALOG_SOURCE: database (por defecto) o files. Otro valor es un error al arrancar.
        AI_CATALOG_RELOAD_MINUTES: entero de 0 en adelante (por defecto 10). Otro valor es un error.
        """
        source = os.environ.get("AI_CATALOG_SOURCE") or "database"
        if source not in CATALOG_SOURCES:
            raise ValueError(f"AI_CATALOG_SOURCE={source!r}; opciones: {', '.join(CATALOG_SOURCES)}")
        raw = os.environ.get("AI_CORS_ORIGINS")
        origins = (DEFAULT_CORS_ORIGINS if raw is None
                   else tuple(o.strip() for o in raw.split(",") if o.strip()))
        raw_minutes = os.environ.get("AI_CATALOG_RELOAD_MINUTES") or str(DEFAULT_RELOAD_MINUTES)
        minutes = int(raw_minutes) if raw_minutes.isdigit() else -1
        if minutes < 0:
            raise ValueError(f"AI_CATALOG_RELOAD_MINUTES={raw_minutes!r}; un entero de 0 en adelante")
        return cls(cors_origins=origins, catalog_source=source, reload_minutes=minutes)
