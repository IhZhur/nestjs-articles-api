📰 NestJS Articles API

📄 Простой учебный CRUD-сервис на NestJS с сущностью Article, подключением к базе данных MySQL, использованием TypeORM, DTO, валидации и Dependency Injection.

📦 Стек технологий

NestJS

TypeORM

MySQL (через XAMPP)

class-validator, class-transformer

REST API

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

GET

/articles

Получить все статьи (с пагинацией и фильтрацией)

GET

/articles/:id

Получить статью по ID

POST

/articles

Создать статью

PUT

/articles/:id

Обновить статью по ID

DELETE

/articles/:id

Удалить статью по ID

Query-параметры для GET /articles:

page — номер страницы (по умолчанию 1)

limit — количество записей на странице (по умолчанию 10)

published — фильтр по статусу публикации (true / false)

Примеры:

GET /articles?page=2&limit=5
GET /articles?published=true
GET /articles?page=1&limit=3&published=false

✅ Пример тела запроса (POST / PUT)

{
  "title": "Новая статья",
  "content": "Это содержимое статьи.",
  "published": true
}

🔐 Валидация

Используется глобальная валидация DTO через class-validator + ValidationPipe.

💠 План разработки

✅ Настройка NestJS + TypeORM + MySQL

✅ Создание сущности Article

✅ Реализация CRUD-маршрутов и бизнес-логики

✅ DTO и валидация через class-validator

✅ Подключение глобального ValidationPipe

✅ Инициализация Git и заливка на GitHub

✅ Написание README.md

✅ Добавить пагинацию и фильтрацию

✅ Реализовать сортировку по дате/заголовку

👨‍💻 Автор

IhZhur