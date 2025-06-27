📰 NestJS Articles API

📄 Простой учебный и production-ready CRUD-сервис на NestJS + TypeORM + MySQL
CRUD для статей и пользователей, роли (admin/user), OwnerOrAdminGuard, логирование, защита токенов, Swagger, миграции.

📦 Стек технологий

NestJS, TypeORM

MySQL (например, через XAMPP)

class-validator, class-transformer

JWT авторизация, RBAC (admin/user)

Swagger UI

Логирование (interceptor)

REST API

🚀 Быстрый старт

Клонируй репозиторий

git clone https://github.com/<твой-логин>/<имя-репозитория>.git
cd <имя-репозитория>

Установи зависимости

npm install

Настрой .env

Скопируй/создай файл .env:

DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=nestjs_articles_db
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

⚠️ Убедись, что база данных nestjs_articles_db создана (например, через XAMPP: http://localhost/phpmyadmin)

Прогони миграции

npx typeorm-ts-node-commonjs migration:run -d data-source.ts

Запусти приложение

npm run start:dev

Приложение будет доступно по адресу:  http://localhost:3000

📚 Доступные маршруты

Метод

URL

Описание

Доступ

GET

/articles

Получить все статьи

🔓 Публичный

GET

/articles/:id

Получить статью по ID

🔓 Публичный

POST

/articles

Создать статью

🔐 Требует JWT

PUT

/articles/:id

Обновить статью по ID

🔐 Требует JWT + author/admin

DELETE

/articles/:id

Удалить статью по ID

🔐 Требует JWT + author/admin

Метод

URL

Описание

Доступ

GET

/users

Все пользователи

🔐 JWT

GET

/users/:id

Один пользователь

🔐 JWT

POST

/users

Создать пользователя

🔓 Публичный

PUT

/users/:id

Обновить пользователя

🔐 JWT + owner/admin

DELETE

/users/:id

Удалить пользователя

🔐 JWT + admin

Метод

URL

Описание

Доступ

POST

/auth/login

Логин

🔓 Публичный

POST

/auth/refresh

Обновить токен

🔓 Публичный

POST

/auth/logout

Выход

🔐 JWT

✅ Пример тела запроса (POST / PUT)

{
  "title": "Новая статья",
  "content": "Это содержимое статьи.",
  "published": true
}

🔐 Авторизация (JWT)

Получи access_token через POST /auth/login

Укажи токен в Swagger (Authorize) или в заголовке:

Authorization: Bearer <твой-токен>

Для защищённых методов (POST/PUT/DELETE) требуется JWT

🧩 Проверки прав (RBAC)

User:

Обновлять/удалять может только сам пользователь или admin

Article:

Обновлять/удалять может только автор статьи или admin

Используется универсальный Guard OwnerOrAdminGuard (см. исходники)

📚 Swagger UI

Открывай http://localhost:3000/api/docs

Полные схемы, примеры, авторизация через Bearer Token

Можно тестировать все методы "вживую" (через "Authorize")

🛠 Основные команды

Скрипт

Описание

npm run start:dev

Запуск в режиме разработки

npm run start

Продакшн запуск (build + run)

npm run test:e2e

E2E-тесты (если настроены)

🗄 Миграции

Файлы — в migrations/

Запуск:

npx typeorm-ts-node-commonjs migration:run -d data-source.ts

💡 Структура проекта

src/article/ — всё для статей (entity, controller, service, dto)

src/user/ — всё для пользователей

src/auth/ — аутентификация, Guard'ы, декораторы

src/common/interceptors/ — логирование

src/main.ts — глобальные пайпы, сериализация, Swagger

🦾 Security best practices

Пароли и refresh-токены никогда не попадают в ответы API (см. @Exclude + class-transformer)

Все защищённые маршруты через Guard'ы

UserId только из токена, не из body

Глобальная валидация DTO, логирование


👨‍💻 Автор

IhZhur