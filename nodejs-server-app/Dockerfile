FROM node:18-slim

# Install nginx
RUN apt-get update && apt-get install -y nginx

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .

COPY nginx.conf /etc/nginx/nginx.conf

# Create directory for pid file
RUN mkdir -p /run/nginx

# Script to start both nginx and node
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]