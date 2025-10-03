# Stage 1: Build the application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy root package.json and pnpm-lock.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Copy frontend package.json
COPY apps/frontend/package.json ./apps/frontend/

# Copy game-logic package.json
COPY packages/game-logic/package.json ./packages/game-logic/

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --filter @balatro-tma/frontend...

# Copy the rest of the source code
COPY . .

# Build the frontend application
RUN pnpm --filter @balatro-tma/frontend build

# Stage 2: Serve the application with Nginx
FROM nginx:1.25-alpine

# Copy the built assets from the build stage
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html

# Copy a custom Nginx configuration
# We will create this file next. It ensures that the single-page application
# routing works correctly.
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]