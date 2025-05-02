
# MediAI Backend

This is the backend server for the MediAI application. It provides APIs for user authentication, symptom analysis, severity assessment, and health tips.

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

3. Seed the database with initial data:
```bash
node data/seedDatabase.js
```

4. Start the server:
```bash
npm run dev
```

The server will start on port 5000 (or the port specified in your .env file).

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login and get JWT token
- **GET /api/auth/me** - Get current user (protected)

### Symptoms

- **GET /api/symptoms** - Get all symptoms
- **POST /api/symptoms/analyze** - Analyze symptoms and get possible conditions
- **GET /api/symptoms/:name** - Get symptom by name

### Assessments

- **POST /api/assessments** - Submit an assessment and get results
- **GET /api/assessments** - Get user's assessment history
- **GET /api/assessments/:id** - Get assessment by ID

### Health Tips

- **GET /api/health-tips** - Get all health tips
- **GET /api/health-tips/category/:category** - Get health tips by category
- **GET /api/health-tips/search** - Search health tips by query
- **GET /api/health-tips/personalized** - Get personalized health tips

## Authentication

The API uses JWT (JSON Web Token) for authentication. Protected routes require a valid token to be included in the request header:

```
Authorization: Bearer <token>
```

## Error Handling

The API returns appropriate status codes and error messages:

- 200 - Success
- 400 - Bad Request
- 401 - Unauthorized
- 404 - Not Found
- 500 - Server Error
