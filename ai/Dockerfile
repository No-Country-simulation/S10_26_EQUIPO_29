# Contexto de construcción: raíz del repositorio.
FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HF_HOME=/data/huggingface

# Hilos de torch. En Railway el contenedor ve los 48 núcleos del servidor, pero su cuota es de
# 8 vCPU: sin este límite, torch abre hilos para 48 y calcular los vectores del banco de
# ejemplos al arrancar pasa de ~16 s a ~3 min.
ENV OMP_NUM_THREADS=4

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
