variable "application_name" {
  description = "Name of the application"
  type        = string
}

variable "image_repository" {
  description = "Docker image repository prefix"
  type        = string
}

variable "tag" {
  description = "Docker image tag"
  type        = string
}

variable "hostname" {
  description = "Ingress hostname"
  type        = string
}

variable "certificate_issuer" {
  description = "Certificate cluster issuer name"
  type        = string
}

variable "postgres_namespace" {
  description = "Namespace where PostgreSQL is deployed"
  type        = string
}

variable "laravel_config" {
  description = "Laravel specific configuration"
  type = object({
    app_env     = string
    app_debug   = string
    log_level   = string
    app_key     = string
    mail_address = string
    mail_password = string
    auth_secret = string
  })
}

variable "postgres_config" {
  description = "PostgreSQL configuration"
  type = object({
    username = string
    password = string
  })
}