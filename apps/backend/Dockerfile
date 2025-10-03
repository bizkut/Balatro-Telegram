# Stage 1: Build the application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy root package.json and pnpm-lock.yaml to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Copy backend and game-logic package.json files
COPY apps/backend/package.json ./apps/backend/
COPY packages/game-logic/package.json ./packages/game-logic/

# Install pnpm and dependencies for the backend workspace
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --filter @balatro-tma/backend...

# Copy the rest of the source code
COPY . .

# Build the backend application (compile TypeScript to JavaScript)
RUN pnpm --filter @balatro-tma/backend build

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /app

# Copy production dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=build /app/packages/game-logic/node_modules ./packages/game-logic/node_modules


# Copy the compiled JavaScript code from the build stage
COPY --from=build /app/apps/backend/dist ./apps/backend/dist
COPY --from=build /app/packages/game-logic/dist ./packages/game-logic/dist

# Copy the backend's package.json to be able to run scripts
COPY --from=build /app/apps/backend/package.json ./apps/backend/package.json

# Expose the port the server listens on
EXPOSE 8080

# The command to start the server
# Note: We use the path inside the container
CMD ["node", "apps/backend/dist/index.js"]