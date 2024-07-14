# Use the official Node.js LTS image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /srv/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Add /srv/app/node_modules/.bin to $PATH
ENV PATH /srv/app/node_modules/.bin:$PATH

# Expose the port that Vite uses
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev"]
