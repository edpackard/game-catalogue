# Game Catalogue

An in-progress app designed to catalogue a video game collection.

It has a node/express backend, with OpenAI integration for (currently) generating genre, review and rating suggestions. Database is Postgresql with Prisma.

The frontend is Angular 20 - you can currently view all game, add a game, update game, and delete a game. When adding or updating, there is an option to auto-generate AI suggestions for the genre.

Most of this project has been written in conjunction with Cursor, as a learning experience.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/edpackard/game-catalogue.git
   cd game-catalogue
   ```

2. **Set up the backend and frontend:**
   - Follow the instructions in the [Backend README](./backend/README.md)
   - Follow the instructions in the [Frontend README](./frontend/README.md)
