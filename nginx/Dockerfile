FROM nginx:latest

# Copy the custom nginx config file
COPY default.conf /etc/nginx/conf.d/default.conf

# Optional: Copy include files if you have them
# COPY include.websocket /etc/nginx/app/include.websocket
# COPY include.forwarded /etc/nginx/app/include.forwarded

# Copy static and media volumes
VOLUME /srv/app/static
VOLUME /srv/app/media
