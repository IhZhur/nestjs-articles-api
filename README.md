# NestJS Articles API

A simple, production-ready REST API for articles and users built with NestJS, TypeORM, and MySQL. Supports full CRUD operations, JWT authentication, user roles (admin/user), RBAC, migrations, logging, and Swagger documentation.

---

## Table of Contents

* [Technologies](#technologies)
* [Quick Start](#quick-start)
* [Configuration](#configuration)
* [Migrations](#migrations)
* [API Overview](#api-overview)

  * [Article Routes](#article-routes)
  * [User Routes](#user-routes)
  * [Authentication](#authentication)
* [Authorization and Access Control](#authorization-and-access-control)
* [Swagger](#swagger)
* [Scripts](#scripts)
* [Project Structure](#project-structure)
* [Security](#security)
* [Roadmap](#roadmap)
* [Author](#author)

---

## Technologies

* NestJS
* TypeORM
* MySQL
* class-validator, class-transformer
* JWT (access/refresh), RBAC (admin/user)
* Swagger UI
* REST API
* Logging (interceptor)

---

## Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Create and configure `.env`:**

   ```env
   DB_TYPE=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=
   DB_DATABASE=nestjs_articles_db
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   ```

   > Make sure the database `nestjs_articles_db` exists (e.g., via phpMyAdmin/XAMPP).
4. **Run migrations:**

   ```bash
   npx typeorm-ts-node-commonjs migration:run -d data-source.ts
   ```
5. **Start the application:**

   ```bash
   npm run start:dev
   ```

   The API will be available at [http://localhost:3000](http://localhost:3000)

---

## Configuration

* All environment variables are stored in `.env`.
* Set your MySQL user password in `DB_PASSWORD`.
* Set strong secrets for `JWT_SECRET` and `JWT_REFRESH_SECRET`.

---

## Migrations

* Migrations are located in the `migrations/` directory.
* Run migrations with:

  ```bash
  npx typeorm-ts-node-commonjs migration:run -d data-source.ts
  ```

---

## API Overview

### Article Routes

| Method | URL            | Description       | Access               |
| ------ | -------------- | ----------------- | -------------------- |
| GET    | /articles      | Get all articles  | Public               |
| GET    | /articles/\:id | Get article by ID | Public               |
| POST   | /articles      | Create article    | JWT required         |
| PUT    | /articles/\:id | Update article    | JWT + owner or admin |
| DELETE | /articles/\:id | Delete article    | JWT + owner or admin |

### User Routes

| Method | URL         | Description       | Access               |
| ------ | ----------- | ----------------- | -------------------- |
| GET    | /users      | Get all users     | JWT required         |
| GET    | /users/\:id | Get user by ID    | JWT required         |
| POST   | /users      | Register new user | Public               |
| PUT    | /users/\:id | Update user       | JWT + owner or admin |
| DELETE | /users/\:id | Delete user       | JWT + admin          |

### Authentication

| Method | URL           | Description   | Access       |
| ------ | ------------- | ------------- | ------------ |
| POST   | /auth/login   | Login         | Public       |
| POST   | /auth/refresh | Refresh token | Public       |
| POST   | /auth/logout  | Logout        | JWT required |

**Sample Request Body (POST/PUT):**

```json
{
  "title": "Article title",
  "content": "Article body text",
  "published": true
}
```

**JWT Authorization:**
Send the access token in the header for protected endpoints:

```
Authorization: Bearer <your_access_token>
```

---

## Authorization and Access Control

* Users can update/delete **only their own accounts** (admin can manage all users).
* Only the article author or admin can update/delete articles.
* Custom guard `OwnerOrAdminGuard` is used for resource-level access control.

---

## Swagger

* Full API documentation: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
* Bearer token authorization and request testing supported.

---

## Scripts

| Script             | Description                  |
| ------------------ | ---------------------------- |
| npm run start\:dev | Start in development mode    |
| npm run start      | Production build & start     |
| npm run test\:e2e  | Run E2E tests (if available) |

---

## Project Structure

* `src/article/` — article entity, controller, service, DTOs
* `src/user/` — user entity, controller, service, DTOs
* `src/auth/` — authentication, guards, decorators
* `src/common/interceptors/` — logging
* `src/main.ts` — global pipes, serialization, Swagger setup

---

## Security

* Passwords and refresh tokens are never returned in API responses (handled with `@Exclude` and class-transformer).
* All protected routes are guarded (JWT and role guards).
* UserId is always taken from JWT, not from the request body.
* Global DTO validation enabled.

---

## Roadmap

* [x] NestJS + TypeORM + MySQL
* [x] CRUD for articles and users
* [x] RBAC and custom guards
* [x] Swagger UI
* [x] JWT auth, refresh, logout
* [x] Logging
* [x] Migrations
* [x] Pagination, sorting, filtering
* [x] E2E tests (template)
* [ ] Docker/Cloud deployment
* [ ] CI/CD pipeline

---

## Author

IhZhur

---

# Navigation notes

> **If the navigation links in the Table of Contents do not work when previewing outside of GitHub:**
>
> * On GitHub.com, anchor links (like `[Quick Start](#quick-start)`) always work and jump to the correct section.
> * In some editors (VS Code, Notepad, some preview plugins), markdown navigation may not work or requires an extension.
> * For reliable preview, open your README.md directly on GitHub after pushing.
