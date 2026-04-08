# LankaX Web (React + Spring Boot + MySQL)

Full-stack website for LankaX Solution with a black/white/gold branded UI and contact form persistence.

## Tech Stack

- Frontend: React + Vite
- Backend: Spring Boot 3 (Java 17)
- Database: MySQL

## Project Structure

- frontend: React application
- backend: Spring Boot API

## 1) MySQL Setup

Create MySQL user/password (or use existing `root`/`root`) and ensure MySQL server is running.

The backend uses:

- Database: `lankax_db`
- JDBC URL: `jdbc:mysql://localhost:3306/lankax_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC`

You can override credentials with environment variables:

- `DB_USERNAME`
- `DB_PASSWORD`

## 2) Run Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Backend will run at `http://localhost:8080`.

Available API:

- `POST /api/contact`

Sample request body:

```json
{
  "name": "John",
  "email": "john@example.com",
  "message": "Need a business website"
}
```

## 3) Run Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend will run at `http://localhost:5173`.

The frontend uses `VITE_API_BASE_URL` for backend base URL.
Default is `http://localhost:8080`.

If needed, create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Notes

- CORS is enabled for `http://localhost:5173` in backend config.
- Contact form submissions are saved into `contact_messages` table.
