FROM node:22-alpine

# Instalar dependencias necesarias para Chromium
RUN apk add --no-cache \
    bash \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    dumb-init \
    curl \
    wget

# Instalar playwright y sus binarios
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm install
RUN npx playwright install --with-deps chromium

COPY . .

CMD ["npm", "run", "dev"]
