📰 NestJS Articles API

📄 Простой учебный CRUD-сервис на NestJS с сущностью Article, подключением к базе данных MySQL, использованием TypeORM, DTO, валидации и Dependency Injection.

📦 Стек технологий

NestJS

TypeORM

MySQL (через XAMPP)

class-validator, class-transformer

REST API с JWT-защитой

🚀 Быстрый старт

1. Клонировать репозиторий

git clone https://github.com/<твой-логин>/<имя-репозитория>.git
cd <имя-репозитория>

2. Установить зависимости

npm install

3. Настроить .env

Создай .env в корне и укажи:

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=nestjs_articles_db

⚠️ Убедись, что база данных nestjs_articles_db существует в XAMPP (http://localhost/phpmyadmin)

4. Запустить приложение

npm run start:dev

Приложение будет доступно по адресу:http://localhost:3000

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

🔐 Требует JWT

DELETE

/articles/:id

Удалить статью по ID

🔐 Требует JWT

✅ Пример тела запроса (POST / PUT)

{
  "title": "Новая статья",
  "content": "Это содержимое статьи.",
  "published": true
}

🔐 Авторизация (JWT)

Для доступа к защищённым маршрутам:

Получи access_token через POST /auth/login

Укажи токен в заголовке:

Authorization: Bearer <твой-токен>

💠 План разработки

Настройка NestJS + TypeORM + MySQL

Создание сущности Article

Реализация CRUD-маршрутов и бизнес-логики

DTO и валидация через class-validator

Подключение глобального ValidationPipe

JWT авторизация и защита маршрутов

Инициализация Git и заливка на GitHub

Написание README.md

✅ Пагинация и фильтрация

🔄 Сортировка по дате/заголовку

📄 Swagger (@nestjs/swagger)

📦 Миграции через TypeORM CLI

🧪 Unit- и e2e-тесты (@nestjs/testing, Jest)

🔐 Регистрация + роли пользователей

☁️ Развёртывание на Render / Railway

👨‍💻 Автор

IhZhur

