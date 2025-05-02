
# MediAI Backend

This is the backend API for the MediAI Guidance Hub application.

## Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Seed the database with initial data:
   ```
   node data/seedData.js
   ```

5. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and get token
- GET /api/auth/me - Get current user (requires auth)

### Symptoms
- GET /api/symptoms - Get all symptoms
- POST /api/symptoms/analyze - Analyze symptoms (requires auth)
- GET /api/symptoms/:name - Get symptom by name

### Assessments
- POST /api/assessments - Submit assessment answers (requires auth)

### Health Tips
- GET /api/health-tips - Get all health tips
- GET /api/health-tips/search - Search health tips
- GET /api/health-tips/category/:category - Get health tips by category
