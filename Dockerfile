# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using a lightweight web server
FROM nginx:alpine

# Copy the built application from the builder stage to the nginx www directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 on the container
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
