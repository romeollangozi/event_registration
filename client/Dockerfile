# Use an official Node runtime as a parent image
FROM node:20 as build

# Set the working directory to /app
WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

CMD ["npm", "run", "preview"]

# # Use a smaller image for serving the static files
# FROM nginx:alpine

# # Set the working directory to /usr/share/nginx/html
# WORKDIR /usr/share/nginx/html

# # Copy the build output from the previous stage
# COPY --from=build /client/dist .

# # Expose port 80 to the outer world
# EXPOSE 3001

# # Command to run the application
# CMD ["nginx", "-g", "daemon off;"]