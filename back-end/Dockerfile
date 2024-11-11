FROM php:8-apache AS base

WORKDIR /var/www/html

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf \
    && a2enmod rewrite \
    && apt-get update -y \
    && apt-get install -y \
    libpq-dev \
    unzip \
    zip \
    zlib1g-dev \
    && docker-php-ext-install gettext pdo_pgsql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


FROM base AS development

COPY . .

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage


FROM base AS builder

COPY composer.* ./
RUN composer install --no-dev --no-scripts --no-autoloader

COPY . .
RUN composer dump-autoload --optimize


FROM base AS production

# Configure Apache to run on non-privileged port
RUN sed -i 's/Listen 80/Listen 8080/' /etc/apache2/ports.conf \
    && sed -i 's/<VirtualHost \*:80>/<VirtualHost *:8080>/' /etc/apache2/sites-available/000-default.conf \
    # Create non-root user
    && useradd -G www-data,root -u 1000 -d /home/dev dev \
    # Update Apache to run as non-root user
    && sed -i 's/export APACHE_RUN_USER=www-data/export APACHE_RUN_USER=dev/' /etc/apache2/envvars \
    && sed -i 's/export APACHE_RUN_GROUP=www-data/export APACHE_RUN_GROUP=dev/' /etc/apache2/envvars \
    # Configure PHP for production
    && mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.enable_cli=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.interned_strings_buffer=16" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=50000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "realpath_cache_size=4096K" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "realpath_cache_ttl=600" >> /usr/local/etc/php/conf.d/opcache.ini

COPY --chown=dev:dev --from=builder /var/www/html/vendor/ ./vendor/

COPY --chown=dev:dev . .


# Create Laravel required directories and set permissions
RUN mkdir -p storage/framework/{cache/data,sessions,views} storage/logs bootstrap/cache \
    && chown -R dev:dev /var/www/html /var/log/apache2 /var/run/apache2 ${PHP_INI_DIR} \
    && chmod -R 755 storage bootstrap/cache

USER dev

EXPOSE 8080

