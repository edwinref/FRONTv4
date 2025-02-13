# Use the official Node.js image as a base image
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install --force

# Copy the rest of the application files
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use a lightweight web server to serve the application
FROM nginx:alpine

# Copy the built application from the previous stage to the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
