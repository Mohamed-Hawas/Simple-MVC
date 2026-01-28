# Simple MVC Backend

A clean, modular Express.js backend application following the MVC (Model-View-Controller) architecture pattern with authentication features.

## Project Overview

This is a Simple MVC backend application built with **Express.js** that implements:
- User authentication (Sign Up, Login, Token Refresh)
- JWT-based token management
- Password hashing with bcrypt
- Request correlation IDs for tracking
- Centralized error handling
- Service-Repository pattern for data access

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Technologies & Dependencies](#technologies--dependencies)
3. [API Endpoints](#api-endpoints)
4. [Architecture Overview](#architecture-overview)
5. [Key Components](#key-components)
6. [Error Handling](#error-handling)
7. [Running the Application](#running-the-application)

---

## Project Structure

```
Simple MVC/
├── src/
│   ├── server.js                    # Application entry point
│   │
│   ├── App/                         # Application business logic
│   │   ├── user/                    # User module
│   │   │   ├── controllers/
│   │   │   │   └── user.controller.js
│   │   │   ├── services/
│   │   │   │   └── user.service.js
│   │   │   ├── models/
│   │   │   │   └── user.model.js
│   │   │   ├── repositories/
│   │   │   │   └── user.repository.js
│   │   │   ├── routes/
│   │   │   │   └── user.route.js
│   │   │   ├── utils/
│   │   │   │   ├── hash.js          # Password hashing utility
│   │   │   │   └── jwt.js           # JWT token generation utility
│   │   │   └── error.js             # User-specific errors
│   │   │
│   │   └── product/                 # Product module (placeholder)
│   │
│   └── Common/                      # Shared utilities
│       ├── CorrelationId/
│       │   └── correlationId.js     # Request tracking middleware
│       ├── Error/
│       │   ├── appError.js          # Custom error class
│       │   └── errorHandler.js      # Global error handler middleware
│       └── Logger/
│           └── logger.js            # Logging utility
│
├── package.json                     # Project dependencies and metadata
└── readme.md                        # This file
```

---

## Technologies & Dependencies

### Core Framework
- **Express.js** (v5.2.1) - Web application framework

### Authentication & Security
- **jsonwebtoken** (v9.0.3) - JWT token generation and verification
- **bcrypt** (v6.0.0) - Password hashing

### Utilities
- **uuid** (v8.3.2) - Generating unique IDs for request correlation

---


## API Endpoints

All endpoints are prefixed with `/user`

### Authentication Endpoints

| Method | Endpoint | Description | Payload |
|--------|----------|-------------|---------|
| POST | `/user/signUp` | Register a new user | `{ email: string, password: string }` |
| POST | `/user/login` | User login | `{ email: string, password: string }` |
| POST | `/user/refresh` | Refresh access token | `{ refreshToken: string }` |
| GET | `/user/me` | Get user profile | Header: `Authorization: Bearer {token}` |

### Response Examples

**Sign Up (201 Created)**
```json
{
  "msg": "User Created Successfully"
}
```

**Login (200 OK)**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

**Get Profile (200 OK)**
```json
{
  "id": "user-id",
  "email": "user@example.com"
}
```

---

## Architecture Overview

### MVC Pattern

The application follows a clean MVC architecture with an additional **Service-Repository** pattern:

```
Routes → Controllers → Services → Repositories → Models → Database
                        ↓
                      Utils (Hash, JWT)
```

### Layer Responsibilities

1. **Routes** (`user.route.js`)
   - Define API endpoints
   - Route requests to controllers

2. **Controllers** (`user.controller.js`)
   - Handle HTTP requests and responses
   - Extract data from request body/headers
   - Call services and send responses
   - Handle errors by passing to next middleware

3. **Services** (`user.service.js`)
   - Implement business logic
   - Orchestrate repository calls
   - Handle validation and transformations
   - Throw custom errors


4. **Models** (`user.model.js`)
   - Define data structure
   - Database schema representation (future plan)

5. **Utils**
   - `hash.js` - Password hashing and verification
   - `jwt.js` - Token generation and verification

---

## Key Components

### 1. Correlation ID Middleware

**File:** [src/Common/CorrelationId/correlationId.js](src/Common/CorrelationId/correlationId.js)

Generates unique request IDs for tracking requests across the system.

```javascript
const { v4: uuidv4 } = require("uuid");

correlationId = (req, res, next) => {
    req.correlationId = uuidv4();
    res.setHeader('X-CorrelationId', uuidv4());
    next();
}
```

**Usage:**
- Added to request object: `req.correlationId`
- Included in response headers: `X-CorrelationId`

---

### 2. Custom Error Class

**File:** [src/Common/Error/appError.js](src/Common/Error/appError.js)

Standardized error handling with HTTP status codes.

```javascript
class AppError extends Error {
    constructor(message, status = 500, isOperational = true) {
        super(message);
        this.status = status;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
```

**Properties:**
- `message` - Error message
- `status` - HTTP status code (default: 500)
- `isOperational` - Whether error is operational (default: true)

---

### 3. Error Handler Middleware

**File:** [src/Common/Error/errorHandler.js](src/Common/Error/errorHandler.js)

Global middleware for catching and responding to errors.

**Features:**
- Catches all errors in the application
- Returns appropriate HTTP status codes
- Sends error response to client
- Logs errors

---

### 4. User Controller

**File:** [src/App/user/controllers/user.controller.js](src/App/user/controllers/user.controller.js)

Handles user-related HTTP requests.

**Methods:**
- `signUp(req, res, next)` - Register new user
- `login(req, res, next)` - Authenticate user
- `refresh(req, res, next)` - Refresh access token
- `getProfile(req, res, next)` - Retrieve user profile

---

## Error Handling

The application uses a centralized error handling system:

1. **Error Flow:**
   - Controller or Service throws `AppError`
   - Error is passed to `next(error)`
   - Global error handler middleware catches it
   - Response is sent to client

2. **Common Errors:**
   - `401 Unauthorized` - Missing or invalid token
   - `400 Bad Request` - Invalid input
   - `404 Not Found` - Resource not found
   - `500 Internal Server Error` - Server error

3. **Error Response Format (example):**
   ```json
   {"level":"error",
   "msg":"Email or password is wrong",
   "timeStamp":1769560850763,
   "statusCode":400,
   "body":{"email":"user@example.com","password":"password12345"},"Id":"e1f43461-bd11-4e26-ace2-932415a52b41"
   }
   ```

---

## Running the Application

### Start Server
```bash
node ~/server.js
```

Expected output:
```
App listening on port 3000
```

### Test Endpoints (using curl or Postman)

**Sign Up:**
```bash
curl -X POST http://localhost:3000/user/signUp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

**Get Profile:**
```bash
curl -X GET http://localhost:3000/user/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```


