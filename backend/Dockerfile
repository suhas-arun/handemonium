# python base image
FROM python:3.11.0

# Workdir for output
WORKDIR /app

# Install dependencies required for OpenCV and GLib
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    ffmpeg \
    libsm6 \
    libxext6 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt to workdir
COPY requirements.txt .

# Install requirements
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy application files
COPY . .

# Run API on container port 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]