# Game Catalogue Backend

This is the backend for the Game Catalogue project, built with Node.js, Express, and Prisma (PostgreSQL).

## Prerequisites

- Node.js (v18+ recommended)
- npm
- PostgreSQL database

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/edpackard/game-catalogue.git
cd game-catalogue/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
PORT=3001
```

Replace `<user>`, `<password>`, `<host>`, `<port>`, and `<database>` with your PostgreSQL credentials.

### 4. Run Database Migrations

This will create the necessary tables in your database:

```bash
npm run db:migrate
```

### 5. Seed the Database (Optional)

To populate the database with 100 retro games:

```bash
npm run db:seed
```

### 6. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001` by default.

## Project Structure

- `endpoints/` — All routes, controllers, services, and repositories
- `data/` — Seed script and seed data
- `prisma/` — Prisma schema and migrations
