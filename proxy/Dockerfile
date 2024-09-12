FROM traefik:v2.10

# Install Node.js and npm if needed
RUN apk add --no-cache gettext

# Set the working directory to /etc/traefik
WORKDIR /etc/traefik

# Define build argument
ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

ARG DOMAIN
ENV DOMAIN=${DOMAIN}

# Copy the necessary files into the working directory
COPY ${ENVIRONMENT}.traefik.tpl traefik.tpl

# Generate the traefik.yaml file using envsubst
RUN envsubst < traefik.tpl > traefik.yml

# Start Traefik with the generated configuration
CMD ["traefik"]
