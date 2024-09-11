FROM traefik:v2.10

# Install Node.js and npm if needed
RUN apk add --no-cache nodejs npm

# Set the working directory to /etc/traefik
WORKDIR /etc/traefik

# Define build argument
ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

# Copy the necessary files into the working directory
COPY ${ENVIRONMENT}.traefik.tpl traefik.tpl

# Generate the traefik.yaml file using envsub
RUN npx envsub --env-file .env traefik.tpl traefik.yaml

# Start Traefik with the generated configuration
CMD ["traefik", "--configFile=/etc/traefik/traefik.yaml"]
