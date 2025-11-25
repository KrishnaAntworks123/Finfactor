#  Pokémon Search Engine

A full-stack web application to search for Pokémon details.  
This project uses a **Java Spring Boot** backend to fetch & cache data from the PokéAPI,  
and a **React (Vite)** frontend to display the results.

---

##  Features

-  **Search Pokémon by Name**
-  **View Official Artwork**
-  **Rich Details:** Types, height, weight, stats, moves, etc.
-  **Redis Caching** for faster repeated searches
-  **Responsive UI** built with Tailwind CSS

---

##  Prerequisites

Make sure you have the following installed:

- **Java JDK 17+**
- **Node.js 18+**
- **Redis**

---

##  Getting Started

### 1. Configure Redis

The backend expects Redis to be running with the following configuration:

- **Host:** `Your Host`  
- **Port:** `Your PORT number`  
- **Password:** `Your Password`

### 2. Start the Backend (Spring Boot)

Open terminal → Go to the backend folder:

```bash
cd Backend

gradlew.bat bootRun
```


### 3. Start the Frontend (React + Vite)

Open another terminal → Go to the frontend folder:
```bash
cd frontend

npm install

npm run dev
```
