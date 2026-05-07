# 🚀 Project Setup & Development Guide

## 📦 Installation

Install all required dependencies:

```sh
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file based on the provided example:

```sh
backend/.env.example
```

Copy it and fill in the required values:

```sh
cp backend/.env.example backend/.env
```

Ensure all environment variables (e.g. database URL, secrets) are properly configured.

---

## 🧑‍💻 Running the App

Start the development server:

```sh
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## 🗄️ Database Workflow

### Apply Migrations

Run all pending migrations:

```sh
npm run db:migrate
```

---

### Generate Migrations

After modifying the schema, generate a new migration:

```sh
npm run db:generate
```

> 💡 Always commit generated migrations to keep environments in sync.

---

### Open Database Studio

Launch the local database GUI:

```sh
npm run db:studio
```

This allows you to inspect and manage your database visually.

---

## 🧠 Best Practices

* Treat `schema.ts` as the **source of truth**
* Use migrations as **versioned history of changes**
* Avoid direct schema pushes in team/production environments
* Always run migrations after pulling new changes

---

## 📁 Example Workflow

```sh
# install deps
npm install

# setup env
cp backend/.env.example backend/.env

# start app
npm run dev

# apply db changes
npm run db:migrate
```

---

## ❗ Troubleshooting

* Ensure `.env` is correctly configured
* Verify database connection is accessible
* Check for pending migrations if schema changes are not reflected

---

Feel free to extend this README with project-specific details as needed.
