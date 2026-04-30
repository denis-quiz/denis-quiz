# 🧠 Denis Quiz App

Denis Quiz App is a scalable, full-stack quiz platform designed to deliver a fast and modern user experience. The project focuses on clean architecture, maintainability, and secure data handling.

## 🚀 Tech Stack

- **Next.js** – Frontend framework for building responsive and dynamic UI
- **Hono** – Backend framework for handling API logic and communication
- **NeonDB** – Serverless PostgreSQL database
- **Drizzle ORM** – Type-safe ORM for database management
- **Better Auth** – Secure authentication and session management
- **Bitbucket** – Version control and collaboration

## 🏗️ Architecture

The application follows a layered architecture:


### Responsibilities

**Frontend (Next.js):**
- UI rendering
- Client-side logic
- Communication with backend API

**Backend (Hono):**
- API endpoints
- Business logic
- Request handling

**Database Layer:**
- Schema definition (Drizzle ORM)
- Data persistence (NeonDB)

## 📥 Clone Repository

In order to clone the project to your local machine:

```sh
git clone git@bitbucket.org:denis-quiz/denis-quiz.git
````


## 📦 Installation

To install dependencies:

```sh
npm install
```

To run:

```sh
npm run dev
```

Then open http://localhost:3001


## 🤝 In order to contribute

1. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name

2. Commit your changes:
    ```sh
   git commit -m "Describe your changes"

3. Push to a feature remote:
    ```sh
   git push origin feature/your-feature-name