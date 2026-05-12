# Royal Tiffin Backend

Express + MongoDB API for the tiffin website admin dashboard.

## Setup

```bash
cd server
npm install
copy .env.example .env
npm run seed
npm run dev
```

Default admin:

```txt
Email: admin@royaltiffin.com
Password: admin123
```

## APIs

```txt
POST   /api/auth/login
POST   /api/users/register
POST   /api/users/login
GET    /api/users/me
GET    /api/orders
GET    /api/orders/my
POST   /api/orders
PATCH  /api/orders/:id/status
GET    /api/customers
GET    /api/meals
POST   /api/meals
PUT    /api/meals/:id
DELETE /api/meals/:id
GET    /api/menu
PUT    /api/menu
GET    /api/revenue
```
