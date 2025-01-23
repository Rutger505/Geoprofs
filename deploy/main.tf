# Namespace
resource "kubernetes_namespace" "app" {
  metadata {
    name = "${var.application_name}-${terraform.workspace}"
  }
}

# ConfigMap
resource "kubernetes_config_map" "app" {
  metadata {
    name      = "${var.application_name}-config"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  data = {
    APP_NAME     = "${var.application_name}-back-end"
    APP_ENV      = var.laravel_config.app_env
    APP_DEBUG    = var.laravel_config.app_debug
    APP_TIMEZONE = "UTC"
    APP_URL      = "https://${var.hostname}"
    LOG_CHANNEL  = "stack"
    LOG_LEVEL    = var.laravel_config.log_level

    L5_SWAGGER_USE_ABSOLUTE_PATH = "false"
    MAIL_MAILER                 = "smtp"
    MAIL_HOST                   = "smtp.gmail.com"
    MAIL_PORT                   = "465"
    MAIL_ENCRYPTION            = "tls"
    MAIL_FROM_NAME             = "${var.application_name} system"

    NEXT_PUBLIC_BACKEND_URL = "https://${var.hostname}/api"
    BACKEND_URL            = "http://${var.application_name}-backend-service.${kubernetes_namespace.app.metadata[0].name}.svc.cluster.local/api"
    AUTH_TRUST_HOST        = "true"
  }
}

# Secret
resource "kubernetes_secret" "app" {
  metadata {
    name      = "${var.application_name}-secret"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  data = {
    APP_KEY           = var.laravel_config.app_key
    DB_CONNECTION     = "pgsql"
    DB_HOST          = "postgres-service.${var.postgres_namespace}.svc.cluster.local"
    DB_PORT          = "5432"
    DB_DATABASE      = var.application_name
    DB_USERNAME      = var.postgres_config.username
    DB_PASSWORD      = var.postgres_config.password
    MAIL_FROM_ADDRESS = var.laravel_config.mail_address
    MAIL_USERNAME    = var.laravel_config.mail_address
    MAIL_PASSWORD    = var.laravel_config.mail_password
    AUTH_SECRET      = var.laravel_config.auth_secret
  }
}

# Backend Deployment
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "${var.application_name}-backend-deployment"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "${var.application_name}-backend-deployment"
      }
    }

    template {
      metadata {
        labels = {
          app = "${var.application_name}-backend-deployment"
        }
      }

      spec {
        init_container {
          name    = "${var.application_name}-migrate"
          image   = "${var.image_repository}-backend:${var.tag}"
          command = ["sh", "-c", "php artisan db:create && php artisan migrate"]

          env_from {
            config_map_ref {
              name = kubernetes_config_map.app.metadata[0].name
            }
          }

          env_from {
            secret_ref {
              name = kubernetes_secret.app.metadata[0].name
            }
          }
        }

        container {
          name  = "${var.application_name}-backend"
          image = "${var.image_repository}-backend:${var.tag}"

          port {
            container_port = 80
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.app.metadata[0].name
            }
          }

          env_from {
            secret_ref {
              name = kubernetes_secret.app.metadata[0].name
            }
          }
        }
      }
    }
  }
}

# Frontend Deployment
resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "${var.application_name}-frontend-deployment"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "${var.application_name}-frontend-deployment"
      }
    }

    template {
      metadata {
        labels = {
          app = "${var.application_name}-frontend-deployment"
        }
      }

      spec {
        container {
          name  = "${var.application_name}-frontend"
          image = "${var.image_repository}-frontend:${var.tag}"

          port {
            container_port = 3000
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.app.metadata[0].name
            }
          }

          env_from {
            secret_ref {
              name = kubernetes_secret.app.metadata[0].name
            }
          }
        }
      }
    }
  }
}

# Services
resource "kubernetes_service" "backend" {
  metadata {
    name      = "${var.application_name}-backend-service"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    selector = {
      app = kubernetes_deployment.backend.metadata[0].name
    }

    port {
      port        = 80
      target_port = 80
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "${var.application_name}-frontend-service"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    selector = {
      app = kubernetes_deployment.frontend.metadata[0].name
    }

    port {
      port        = 80
      target_port = 3000
    }

    type = "ClusterIP"
  }
}

# Ingress
resource "kubernetes_ingress_v1" "app" {
  metadata {
    name      = "${var.application_name}-ingress"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    ingress_class_name = "traefik"

    tls {
      hosts       = [var.hostname]
      secret_name = "${var.application_name}-tls"
    }

    rule {
      host = var.hostname

      http {
        path {
          path      = "/"
          path_type = "Prefix"
          backend {
            service {
              name = kubernetes_service.frontend.metadata[0].name
              port {
                number = 80
              }
            }
          }
        }

        path {
          path      = "/api"
          path_type = "Prefix"
          backend {
            service {
              name = kubernetes_service.backend.metadata[0].name
              port {
                number = 80
              }
            }
          }
        }
      }
    }
  }
}

# Certificate
resource "kubernetes_manifest" "certificate" {
  manifest = {
    apiVersion = "cert-manager.io/v1"
    kind       = "Certificate"
    metadata = {
      name      = "${var.application_name}-certificate"
      namespace = kubernetes_namespace.app.metadata[0].name
    }
    spec = {
      secretName  = "${var.application_name}-tls"
      duration    = "2160h"
      renewBefore = "360h"
      dnsNames    = [var.hostname]
      issuerRef = {
        name = var.certificate_issuer
        kind = "ClusterIssuer"
      }
    }
  }
}