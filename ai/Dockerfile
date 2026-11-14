# Contexto de construcción: raíz del repositorio.
FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HF_HOME=/data/huggingface

COPY ai/requirements.txt /tmp/ai/requirements.txt
# PyTorch solo CPU evita descargar librerías CUDA innecesarias; PEP 440 2.14.1+cpu satisface torch==2.14.1.
RUN pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu torch==2.14.1 \
    && pip install --no-cache-dir -r /tmp/ai/requirements.txt \
    && rm -rf /tmp/ai

COPY ai /app/ai
COPY shared /app/shared

# Carpeta del volumen persistente de Railway para caché del modelo de embeddings.
RUN mkdir -p /data/huggingface

EXPOSE 8001
CMD ["sh", "-c", "exec uvicorn ai.service.app:create_app --factory --host 0.0.0.0 --port ${PORT:-8001}"]
