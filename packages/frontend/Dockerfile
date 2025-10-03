# Stage 1: Build the application
FROM node:20-alpine as builder

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

# Stage 2: Serve the static files with Nginx
FROM nginx:stable-alpine

# Copy the built static files from the builder stage
COPY --from=builder /usr/src/app/packages/frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]