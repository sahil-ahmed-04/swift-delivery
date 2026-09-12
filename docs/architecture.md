# System Architecture & Technical Design

## 1. High-Level System Architecture

Swift Delivery is designed as a multi-role, modular hyperlocal delivery application. The backend serves client interactions through a structured REST API and real-time WebSocket events.

```
                         ┌───────────────────────────┐
                         │   Next.js 14+ Frontend    │
                         │                           │
                         │  - Customer Storefront    │
                         │  - Store Manager Console  │
                         │  - Delivery Boy App       │
                         │  - Admin Control Center   │
                         └─────────────┬─────────────┘
                                       │
                         HTTP REST API │ WebSocket (Socket.IO)
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │      NestJS Backend       │
                         │                           │
                         │   Global Interceptors     │
                         │   Exception Filters       │
                         │   JWT & RBAC Guards       │
                         │                           │
                         │   Modules:                │
                         │    • Auth & Users         │
                         │    • Stores & Categories  │
                         │    • Products & Inventory │
                         │    • Orders & Cart        │
                         │    • Delivery & Tracking  │
                         └─────────────┬─────────────┘
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │       MongoDB Atlas       │
                         │       / Local Mongo       │
                         │                           │
                         │   Mongoose ODM Layer      │
                         └───────────────────────────┘
```

---

## 2. Request Lifecycle (Backend)

Every incoming HTTP request traverses a standard NestJS pipeline:

1. **Incoming Request:** Arrives at `/api/v1/*`.
2. **Middleware:** CORS headers, body parser, request logging.
3. **Guards:**
   - `JwtAuthGuard`: Extracts Bearer token, validates signature, attaches `req.user`.
   - `RolesGuard`: Validates required roles (e.g. `@Roles(Role.STORE_MANAGER)`).
4. **Validation Pipes:**
   - `ValidationPipe`: Transforms payload into DTO and enforces class-validator rules (`whitelist: true`, `transform: true`).
5. **Controller:** Maps endpoint, coordinates input, delegates to Service layer.
6. **Service:** Executes business logic, interacts with Mongoose models, triggers events.
7. **Transform Interceptor:** Wraps all successful output in standard format:
   ```json
   {
     "success": true,
     "statusCode": 200,
     "message": "Operation completed successfully",
     "data": { ... },
     "timestamp": "2026-09-12T16:00:00.000Z"
   }
   ```
8. **Exception Filters:** Catches any `HttpException` or database error and returns standard error schema:
   ```json
   {
     "success": false,
     "statusCode": 404,
     "message": "Resource not found",
     "errors": null,
     "timestamp": "2026-09-12T16:00:00.000Z"
   }
   ```

---

## 3. Frontend Architecture (Next.js App Router)

The frontend separates concerns using Next.js App Router route groups:

- `app/(customer)`: Public and customer-specific pages:
  - Catalog browsing
  - Cart drawer and checkout
  - Order tracking
  - Customer account profile
- `app/admin`: System administrator dashboard:
  - Dark store creation & assignment
  - Category and master product management
  - Delivery partner onboarding & KYC verification
- `app/store`: Dark store manager workflow:
  - Real-time incoming order audio/visual alerts
  - Order packing checklist
  - Out of stock toggles & inventory counts
- `app/delivery`: Delivery partner mobile-first web view:
  - Available delivery orders in range
  - Pickup confirmation & navigation
  - Proof of delivery / customer verification code

---

## 4. Scalability & Extensibility Roadmap

- **Caching Layer (Phase 31):** Redis for frequently viewed product catalogs, category trees, and active delivery boy GPS coordinates.
- **Background Workers (Phase 32):** BullMQ for sending order confirmation emails, push notifications, and daily sales digests.
- **Media Uploads (Phase 33):** Cloudinary or AWS S3 signed URLs for high-resolution product images and delivery completion receipts.
- **Containerization (Phase 34):** Multi-stage Dockerfiles and `docker-compose.yml` for unified local dev and production orchestration.
