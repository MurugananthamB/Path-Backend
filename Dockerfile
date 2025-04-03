# Stage 1: Use Debian-based Node
FROM node:20-slim

# Create app directory
WORKDIR /app

# Install necessary system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy package files & install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the source code
COPY . .

# Expose port (your internal app port)
EXPOSE 5000

# CMD
CMD ["npm", "start"]
