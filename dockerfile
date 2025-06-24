# Use official Node.js LTS base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all project files to the working directory
COPY . .

# Set environment variable to production (optional but recommended)
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
