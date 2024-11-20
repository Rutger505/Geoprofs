accessLog: { }

api:
  dashboard: true
  insecure: true

log:
  level: WARN

entryPoints:
  web:
    address: :80
    # Redirect HTTP to HTTPS
    http:
      redirections:
        entryPoint:
          to: "websecure"
          scheme: "https"
          permanent: true
  websecure:
    address: :443

tls:
  certificates:
    - certFile: /ssl/${DOMAIN}.pem
      keyFile: /ssl/${DOMAIN}-key.pem
    - certFile: /ssl/breeze.${DOMAIN}.pem
      keyFile: /ssl/breeze.${DOMAIN}-key.pem

providers:
  docker:
    exposedByDefault: true
  file:
    directory: /etc/traefik
    watch: true
