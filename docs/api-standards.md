# API Standards & Response Specifications

## 1. Base URL & Versioning

All API endpoints are versioned with the prefix:
```
/api/v1/
```

Example: `http://localhost:4000/api/v1/health`

---

## 2. Standard Success Response Envelope

All successful REST API responses follow this JSON structure:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Resource fetched successfully",
  "data": { ... },
  "timestamp": "2026-09-12T16:00:00.000Z"
}
```

For paginated collections:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Products retrieved",
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalItems": 150,
    "totalPages": 8
  },
  "timestamp": "2026-09-12T16:00:00.000Z"
}
```

---

## 3. Standard Error Response Envelope

All errors (validation errors, 404s, unauthorized, 500s) follow this JSON structure:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    "email must be an email",
    "password must be longer than or equal to 8 characters"
  ],
  "timestamp": "2026-09-12T16:00:00.000Z",
  "path": "/api/v1/auth/register"
}
```

---

## 4. HTTP Status Code Guidelines

| Code | Usage |
| :--- | :--- |
| `200 OK` | Successful query or synchronous update |
| `201 Created` | Successful resource creation (`POST`) |
| `400 Bad Request` | Validation failure or malformed payload |
| `401 Unauthorized` | Missing or expired JWT token |
| `403 Forbidden` | Valid token, but insufficient role permissions (RBAC) |
| `404 Not Found` | Requested entity does not exist |
| `409 Conflict` | Unique constraint violation (e.g. email already exists) |
| `422 Unprocessable` | Business logic failure (e.g. insufficient inventory) |
| `500 Internal Error` | Unhandled server or database exception |
