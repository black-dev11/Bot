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

RUN npm install && npm install -g qrcode-terminal pm2

COPY . .

EXPOSE 5000

CMD ["node", "cluster.js"]
