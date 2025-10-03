# Base image with a compatible Node.js version
FROM node:20-alpine

# Set the working directory to the root of the monorepo
WORKDIR /usr/src/app

# Update npm to a compatible version that supports workspaces
RUN npm install -g npm@10

# Copy all package.json files to leverage Docker cache
COPY package.json ./
COPY packages/core/package.json ./packages/core/
COPY packages/frontend/package.json ./packages/frontend/
COPY packages/backend/package.json ./packages/backend/
COPY packages/bot/package.json ./packages/bot/

# Install all dependencies for all workspaces
RUN npm install

# Copy the rest of the source code
COPY . .

# Build all TypeScript sources for all workspaces
RUN npm run build

# Set the working directory to the backend package for the final command
WORKDIR /usr/src/app/packages/backend

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
CMD [ "npm", "start" ]