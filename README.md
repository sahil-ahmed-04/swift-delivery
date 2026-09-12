# Swift Delivery 🚀

A modern, production-grade **Hyperlocal Delivery Platform** built with **Express**, **Next.js**, **MongoDB / Mongoose**, and **TypeScript**.

Inspired by platforms like Blinkit and Zepto, Swift Delivery connects customers, dark stores, store managers, and delivery partners through automated order routing, inventory tracking, and real-time order lifecycle management.

---

## 🏗️ Architecture Overview

```
                      HYPERLOCAL DELIVERY PLATFORM

                              ┌─────────┐
                              │  ADMIN  │
                              └────┬────┘
                                   │
                  ┌────────────────┼────────────────┐
                  │                │                │
                  ▼                ▼                ▼
              ┌────────┐      ┌──────────┐    ┌──────────┐
              │ STORES │      │ PRODUCTS │    │ DELIVERY │
              └────┬───┘      └─────┬────┘    └────┬─────┘
                   │                │              │
                   └────────────────┼──────────────┘
                                    │
                                    ▼
                              ┌──────────┐
                              │ CUSTOMER │
                              └────┬─────┘
                                   │
                                   ▼
                                 ORDER
                                   │
                                   ▼
                              STORE MANAGER
                                   │
                                   ▼
                                 PACKED
                                   │
                                   ▼
                             DELIVERY BOY
                                   │
                                   ▼
                            LIVE TRACKING
                                   │
                                   ▼
                               DELIVERED
```

---

## 👥 Platform User Roles

| Role | Responsibility |
| :--- | :--- |
| **Admin** | Manages stores, verifies delivery partners, system-wide analytics, category & catalog oversight |
| **Store Manager** | Receives new orders, packs items, updates inventory, marks orders ready for pickup |
| **Delivery Boy** | Accepts delivery assignments, navigates to store, picks up order, streams live GPS location, confirms delivery |
| **Customer** | Browses nearby store catalog, manages cart, checks out, tracks live delivery progress |

---

## 💻 Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Express, Node.js, TypeScript
- **Database:** MongoDB + Mongoose ODM
- **Real-Time:** Socket.IO (Phase 20+)
- **Architecture Pattern:** Modular monorepo with clean separation of concerns

---

## 📁 Repository Structure

```
swift-delivery/
├── frontend/             # Next.js App Router client application
│   ├── app/              # Role-based route groups
│   ├── components/       # Shared UI components
│   ├── lib/              # API helpers, utilities
│   └── types/            # TypeScript interfaces
│
├── backend/              # Express REST API application
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── routes/       # Express route definitions
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Mongoose schemas
│   │   └── app.ts        # Express app setup
│
├── docs/                 # Architectural documentation & developer guides
│   ├── architecture.md   # System design and request lifecycle
│   ├── business-flow.md  # Core entities and order state machine
│   ├── git-workflow.md   # Branching model and commit conventions
│   └── api-standards.md  # Unified JSON response schema & status codes
│
├── .gitignore            # Git ignore specification
├── package.json          # Root orchestration scripts
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18+ (tested on v24)
- **npm:** v9+ (tested on v12)
- **Git:** 2.x+
- **MongoDB:** (required in Phase 2+)

### Installation

1. **Clone and checkout develop branch:**
   ```bash
   git clone <repository-url>
   cd swift-delivery
   git checkout develop
   ```

2. **Install all dependencies:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ..
   ```

3. **Configure Environment Variables:**
   - Copy `backend/.env.example` to `backend/.env` (if exists) or create `.env` with `PORT=4000` and `MONGO_URI`.
   - Copy `frontend/.env.example` to `frontend/.env.local`

4. **Run Development Server:**
   ```bash
   # Terminal 1: Backend
   npm run dev:backend

   # Terminal 2: Frontend
   npm run dev:frontend
   ```

---

## 🗺️ Roadmap Progress

- [x] **Phase 0:** Understand business logic and delivery platform entities
- [x] **Phase 1:** Project Architecture, Monorepo Layout, and Git Workflow
- [x] **Phase 2:** MongoDB fundamentals & connection setup
- [x] **Phase 3:** Mongoose data models & schemas
- [x] **Phase 4:** Database relationships & indexing
- [x] **Phase 5:** Express backend core services
- [x] **Phase 6:** JWT Authentication & Role-Based Access Control (RBAC)
- [ ] *(Remaining phases up to Phase 38)*
