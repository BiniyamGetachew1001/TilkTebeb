# TilkTebeb Django API Documentation

This document outlines all the API endpoints that need to be implemented in the Django backend to support the TilkTebeb frontend application.

## Base Configuration

- **Base URL**: `http://localhost:8000/api` (development)
- **Authentication**: JWT Token-based authentication
- **Content Type**: `application/json`
- **CORS**: Must be configured to allow requests from frontend domain

## Authentication Endpoints

### POST `/auth/login/`
**Description**: Authenticate user and return JWT token

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200)**:
```json
{
  "id": "user-uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "plan": "medium",
  "token": "jwt-token-here"
}
```

**Error Responses**:
- `400`: Invalid credentials
- `401`: Authentication failed

### POST `/auth/register/`
**Description**: Register new user account

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201)**:
```json
{
  "id": "user-uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "plan": "base",
  "token": "jwt-token-here"
}
```

**Error Responses**:
- `400`: Validation errors
- `409`: Email already exists

## Books Endpoints

### GET `/books/`
**Description**: Get list of book previews with optional filtering

**Query Parameters**:
- `category` (optional): Filter by category
- `query` (optional): Search query for title/author
- `premium` (optional): Filter by premium status (true/false)
- `limit` (optional): Limit number of results

**Response (200)**:
```json
[
  {
    "id": "book-slug",
    "title": "Book Title",
    "author": "Author Name",
    "coverUrl": "https://example.com/cover.jpg",
    "category": "Finance",
    "rating": 4.5
  }
]
```

### GET `/books/{id}/`
**Description**: Get detailed book information

**Response (200)**:
```json
{
  "id": "book-slug",
  "title": "Book Title",
  "author": "Author Name",
  "coverUrl": "https://example.com/cover.jpg",
  "category": "Finance",
  "rating": 4.5,
  "pages": 300,
  "language": "English",
  "summary": "<p>HTML content...</p>",
  "keyInsights": "<p>HTML content...</p>",
  "applications": "<p>HTML content...</p>",
  "isPremium": false
}
```

**Error Responses**:
- `404`: Book not found

## Business Plans Endpoints

### GET `/business-plans/`
**Description**: Get list of business plan previews with optional filtering

**Query Parameters**:
- `size` (optional): Filter by size (small/medium/large)
- `category` (optional): Filter by category
- `query` (optional): Search query
- `premium` (optional): Filter by premium status

**Response (200)**:
```json
[
  {
    "id": "plan-id",
    "title": "Plan Title",
    "category": "Food & Beverage",
    "size": "small",
    "description": "Plan description",
    "isPremium": false
  }
]
```

### GET `/business-plans/{id}/`
**Description**: Get detailed business plan information

**Response (200)**:
```json
{
  "id": "plan-id",
  "title": "Plan Title",
  "category": "Food & Beverage",
  "size": "small",
  "description": "Plan description",
  "overview": "<p>HTML content...</p>",
  "marketAnalysis": "<p>HTML content...</p>",
  "financials": "<p>HTML content...</p>",
  "implementation": "<p>HTML content...</p>",
  "isPremium": false
}
```

## User Management Endpoints

### GET `/user/{userId}/`
**Description**: Get user profile and activity
**Authentication**: Required

**Response (200)**:
```json
{
  "user": {
    "id": "user-uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com",
    "plan": "medium"
  },
  "activities": [
    {
      "id": "activity-id",
      "userId": "user-uuid",
      "type": "book_read",
      "itemId": "book-slug",
      "itemTitle": "Book Title",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### PATCH `/user/{userId}/`
**Description**: Update user profile
**Authentication**: Required

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "newemail@example.com"
}
```

**Response (200)**:
```json
{
  "id": "user-uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "newemail@example.com",
  "plan": "medium"
}
```

## Payment Endpoints

### POST `/payments/`
**Description**: Process payment for subscription
**Authentication**: Required

**Request Body**:
```json
{
  "userId": "user-uuid",
  "amount": 29.99,
  "plan": "medium",
  "paymentMethod": "telebirr",
  "paymentDetails": {
    "phoneNumber": "+251912345678"
  }
}
```

**Response (200)**:
```json
{
  "success": true,
  "transactionId": "TRX-123456789",
  "message": "Payment processed successfully",
  "timestamp": "2024-01-01T00:00:00Z",
  "plan": "medium"
}
```

### GET `/payments/verify/{transactionId}/`
**Description**: Verify payment status
**Authentication**: Required

**Response (200)**:
```json
{
  "success": true,
  "status": "completed",
  "message": "Payment verified successfully"
}
```

### GET `/payments/?userId={userId}`
**Description**: Get payment history for user
**Authentication**: Required

**Response (200)**:
```json
[
  {
    "success": true,
    "transactionId": "TRX-123456789",
    "message": "Payment processed successfully",
    "timestamp": "2024-01-01T00:00:00Z",
    "plan": "medium"
  }
]
```

## Bookmarks Endpoints

### GET `/user/{userId}/bookmarks/`
**Description**: Get user's bookmarked books
**Authentication**: Required

**Response (200)**:
```json
[
  {
    "id": "book-slug",
    "title": "Book Title",
    "author": "Author Name",
    "coverUrl": "https://example.com/cover.jpg",
    "category": "Finance",
    "rating": 4.5
  }
]
```

### POST `/user/{userId}/bookmarks/`
**Description**: Add book to bookmarks
**Authentication**: Required

**Request Body**:
```json
{
  "bookId": "book-slug"
}
```

**Response (201)**:
```json
{
  "success": true
}
```

### DELETE `/user/{userId}/bookmarks/{bookId}/`
**Description**: Remove book from bookmarks
**Authentication**: Required

**Response (200)**:
```json
{
  "success": true
}
```

## Analytics Endpoints

### GET `/user/{userId}/analytics/`
**Description**: Get user reading analytics
**Authentication**: Required

**Response (200)**:
```json
{
  "readingStats": {
    "booksRead": 12,
    "totalReadingTime": 2400,
    "averageReadingSpeed": 250,
    "streakDays": 7
  },
  "recentActivity": [
    {
      "id": "activity-id",
      "type": "book_read",
      "itemTitle": "Book Title",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Admin Endpoints

### GET `/admin/stats/`
**Description**: Get admin dashboard statistics
**Authentication**: Required (Admin only)

**Response (200)**:
```json
{
  "totalUsers": 1250,
  "totalBooks": 247,
  "totalBusinessPlans": 54,
  "revenueThisMonth": 15750
}
```

### GET `/admin/users/`
**Description**: Get paginated list of users
**Authentication**: Required (Admin only)

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `search` (optional): Search query for user name/email

**Response (200)**:
```json
{
  "users": [
    {
      "id": "user-uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "user@example.com",
      "plan": "medium",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1250,
  "page": 1,
  "totalPages": 63
}
```
