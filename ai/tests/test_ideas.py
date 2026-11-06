"""Ideas de integración: entrada del modelo y validación de su salida (sin llamar al LLM)."""

from ai.ideas import NO_LANGUAGE, CodeBlock, ideas_input, split_readme
from shared.contracts.repo import Repo


def _repo(readme: str) -> Repo:
    return Repo.model_validate({"full_name": "acme/tool", "github_id": 1, "description": "Tool",
                                "topics": [], "stargazers_count": 1,
                                "pushed_at": "2026-10-01T00:00:00Z", "archived": False,
                                "readme_text": readme})


# --- Bloques de código ---

def test_separa_prosa_y_bloques_en_orden():
    partes = split_readme("Intro.\n\n```python\nimport x\n```\n\nFin.")
    assert partes[0].strip() == "Intro."
    assert partes[1] == CodeBlock("python", "import x")
    assert partes[2].strip() == "Fin."


def test_el_lenguaje_es_la_primera_palabra_de_la_marca_en_minusculas():
    partes = split_readme('```Python hl_lines="7 12"\nprint(1)\n```')
    assert partes == [CodeBlock("python", "print(1)")]


def test_sin_marca_el_lenguaje_es_text():
    assert split_readme("```\npip install tool\n```") == [CodeBlock(NO_LANGUAGE, "pip install tool")]


def test_cerca_de_virgulillas_y_cierre_con_el_mismo_caracter():
    partes = split_readme("~~~sh\necho ```\n~~~")
    assert partes == [CodeBlock("sh", "echo ```")]


def test_bloque_sin_cerrar_llega_hasta_el_final():
    assert split_readme("```bash\nmake\nmake install") == [CodeBlock("bash", "make\nmake install")]


def test_bloques_vacios_se_omiten():
    assert split_readme("```\n\n```\nTexto.") == ["Texto."]


# --- Entrada del modelo ---

def test_el_codigo_conserva_las_urls_y_la_prosa_no():
    readme = ("See https://docs.tool.dev for more.\n\n"
              "```\ncurl http://localhost:8080/api/chat -d '{}'\n```")
    entrada = ideas_input(_repo(readme))
    assert "https://docs.tool.dev" not in entrada.text
    assert entrada.blocks[1].code == "curl http://localhost:8080/api/chat -d '{}'"
    assert "[bloque 1 · text]" in entrada.text


def test_los_bloques_se_numeran_en_orden_desde_uno():
    readme = "```sh\npip install tool\n```\n\nUso:\n\n```python\nimport tool\n```"
    entrada = ideas_input(_repo(readme))
    assert [(n, b.language) for n, b in entrada.blocks.items()] == [(1, "sh"), (2, "python")]


def test_el_recorte_nunca_parte_un_bloque():
    largo = "\n".join(f"linea {i}" for i in range(50))
    readme = "Intro corta.\n\n```\n" + largo + "\n```\n\nFin."
    entrada = ideas_input(_repo(readme), limit=100)
    assert entrada.blocks == {}
    assert "linea" not in entrada.text
    assert entrada.text == "Intro corta."


def test_todo_bloque_numerado_esta_completo_en_el_texto():
    readme = "\n\n".join(f"Paso {i}.\n\n```sh\ncomando-{i} --opcion\n```" for i in range(30))
    entrada = ideas_input(_repo(readme), limit=500)
    assert len(entrada.text) <= 500
    assert entrada.blocks
    for numero, bloque in entrada.blocks.items():
        assert f"[bloque {numero} · sh]\n```\n{bloque.code}\n```" in entrada.text


def test_sin_readme_no_hay_texto_ni_bloques():
    entrada = ideas_input(_repo(None))
    assert entrada.text == "" and entrada.blocks == {}
