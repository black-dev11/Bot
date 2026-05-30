FROM node:20-bullseye

# Canvas aur multimedia packages ke liye essential compile-tools install karna
RUN apt-get update && \
    apt-get install -y \
    ffmpeg \
    imagemagick \
    webp \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*
  
WORKDIR /usr/src/app

COPY package.json .

# Purane local folders clear karke strict peer dependency conflict ko bypass karna
RUN rm -rf node_modules package-lock.json && \
    npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD ["node", "cluster.js"]
