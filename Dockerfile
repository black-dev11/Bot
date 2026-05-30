FROM node:20-bullseye

# Canvas aur multimedia packages install karna
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

# Fresh core modules installation
RUN rm -rf node_modules package-lock.json && \
    npm install && \
    npm install -g qrcode-terminal pm2

COPY . .

# Bot port exposure
EXPOSE 5000

# Direct index.js ko start karega bina cluster.js ke jhat jhat ke
CMD ["node", "index.js"]
