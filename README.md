# Начало работы с Strapi

Backend-часть приложения реализована на **Strapi v5** и используется как headless CMS и API-сервер
для frontend-приложения. Strapi отвечает за аутентификацию пользователей, управление ролями и
правами доступа, а также за предоставление REST API.

В проекте используется JWT-аутентификация и плагин Users & Permissions.
Все проверки прав доступа выполняются на стороне backend.

## Требования

- Node.js 18+
- npm

## Установка

npm install

##Админ-панель доступна по адресу 

http://localhost:1337/admin

##Сборка

npm run build

## .env
```
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=your_app_keys_here
API_TOKEN_SALT=your_api_token_salt_here
ADMIN_JWT_SECRET=your_admin_jwt_secret_here
TRANSFER_TOKEN_SALT=your_transfer_token_salt_here
ENCRYPTION_KEY=your_encryption_key_here

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=your_jwt_secret_here
```


