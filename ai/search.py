"""Búsqueda semántica sobre el catálogo de repos."""

from shared.contracts.repo import Category, Repo

# Topics de ruido que no describen qué hace un repo: campañas, etiquetas
# de GitHub o que se comparten con todos los repos del catálogo.
NOISE_TOPICS = frozenset({
    "hacktoberfest",
    "beginner-friendly",
    "featured",
    "works-with-react",
    "example",
    "open-source",
})


def clean_topics(topics: list[str]) -> list[str]:
    """Topics sin los de `NOISE_TOPICS`, en su orden original."""
    return [t for t in topics if t not in NOISE_TOPICS]


def build_embedding_text(repo: Repo, categories: dict[str, Category]) -> str:
    """Texto que representa  el repo en la búsqueda.

    Orden: nombre -> categorías -> descripción -> topics.
    Si el repo no tiene descripción, se omite esa parte.
    """
    parts = [repo.full_name.split("/")[1] + "."]

    for assignment in repo.categories:
        category = categories[assignment.category_id]
        parts.append(f"{category.name}: {category.description}")

    description = (repo.description or "").strip()
    if description:
        if not description.endswith((".", "!", "?")):
            description += "."
        parts.append(description)

    topics = clean_topics(repo.topics)
    if topics:
        parts.append("Topics: " + ", ".join(topics) + ".")

    return " ".join(parts)
