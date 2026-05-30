FROM node:20-bullseye

# Multimedia aur Canvas build tools install karna
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

# Purane corrupted folders delete karke fresh installation
RUN rm -rf node_modules package-lock.json && \
    npm install

COPY . .

EXPOSE 5000

CMD ["node", "cluster.js"]
