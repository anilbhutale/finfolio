#!/bin/sh

# Wait for the database to be ready (optional, useful if you have a database container)
# until nc -z -v -w30 db 5432
# do
#   echo "Waiting for database connection..."
#   sleep 1
# done

# Run database migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Start the application server
exec gunicorn --bind 0.0.0.0:8000 api.wsgi:application
