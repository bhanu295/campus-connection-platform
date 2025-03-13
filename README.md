
# CampusHub - Separated Frontend and Backend

This project has been set up with separate frontend and backend servers.

## Getting Started

### Backend Server Setup

1. Navigate to the backend directory:
```bash
cd src/api
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm run dev
```

The backend server will run on http://localhost:5000

### Frontend Server Setup

1. In a new terminal, navigate to the project root directory

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend server will run on http://localhost:8080

## API Communication

The frontend communicates with the backend through API calls. In development mode:
- Frontend runs on: http://localhost:8080
- Backend runs on: http://localhost:5000
- API requests are automatically proxied from the frontend to the backend

## Production Deployment

For production, you'll need to:
1. Build the backend and deploy it to a server
2. Build the frontend and deploy it to a static hosting service
3. Update the API_BASE_URL in the frontend code to point to your production backend server

## Testing the Connection

You can test if the servers are properly connected by:
1. Creating a user account through the registration page
2. Logging in with the created credentials
3. Accessing protected routes like the dashboard

If you encounter any issues with the connection, check the browser console for error messages and ensure both servers are running.
