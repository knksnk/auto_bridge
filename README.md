# AutoBridge

Профессиональный frontend + backend MVP для маркетплейса автомобилей из Китая.

## Структура

- `frontend/` — React + TypeScript + Vite, каталог, карточка автомобиля, кабинет и кастомная админка.
- `backend/` — NestJS + Prisma API, auth, каталог, избранное, сравнение, заявки и admin CRUD.
- `docker-compose.yml` — локальный PostgreSQL для backend.

## Запуск frontend

```bash
cd /Users/anastasia/Desktop/auto_bridge/frontend
npm install
npm run dev
```

Frontend откроется на `http://localhost:5173`.

## Запуск backend

```bash
cd /Users/anastasia/Desktop/auto_bridge
docker compose up -d postgres

cd backend
cp .env.example .env
npm install
npm run prisma:migrate
npm run seed
npm run start:dev
```

Backend API будет доступен на `http://localhost:3000/api`.

PostgreSQL в Docker проброшен на локальный порт `5433`, чтобы не конфликтовать с системным Postgres на `5432`.

Тестовый админ:

- email: `admin@autobridge.local`
- пароль: `admin12345`

## Проверка

```bash
cd frontend && npm run lint && npm run build
cd ../backend && npm run lint && npm run build
```
