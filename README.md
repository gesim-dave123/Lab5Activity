# Gesim Lab 5 - Employee Management System

A full-stack TypeScript-based employee management system with role-based access control (RBAC), request workflow management, and department organization.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [User Roles & Permissions](#user-roles--permissions)
- [Authentication & Authorization](#authentication--authorization)
- [Frontend Features](#frontend-features)
- [Key Implementation Details](#key-implementation-details)
- [Development Notes](#development-notes)

---

## 🎯 Project Overview

This employee management system allows organizations to:

- Manage employees organized by departments
- Submit and track requests (e.g., leave, equipment, etc.)
- Enable users to edit their own profiles
- Provide admins with full control and oversight
- Display public guest content

**Key Features:**

- JWT-based authentication
- Role-based access control (Admin, User)
- Request workflow with status tracking (Pending, Approved, Rejected)
- Department-based employee organization
- Responsive Bootstrap 5 UI with modern styling
- Transaction-based request creation (Request + Items)

---

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Sequelize (MySQL dialect)
- **Security**: bcrypt (password hashing), JWT (authentication)

### Frontend

- **Markup**: HTML5
- **Styling**: CSS3 (custom + Bootstrap 5)
- **Scripts**: Vanilla JavaScript (ES6+)
- **Storage**: SessionStorage & LocalStorage (JWT tokens)

### Database

- **DBMS**: MySQL
- **Connection**: Configured in `config.json`

---

## 📁 Project Structure

```
Gesim_Lab5Activity/
├── client/                          # Frontend (HTML/CSS/JS)
│   ├── index.html                  # Main dashboard
│   ├── script.js                   # All UI logic and API calls
│   └── styles.css                  # Custom styling (Inter font, modern card-based design)
│
├── server/            # Backend (Node + Express + TypeScript)
│   ├── src/
│   │   ├── server.ts               # Express app setup, route mounting
│   │   ├── config.json             # Database credentials
│   │   ├── tsconfig.json           # TypeScript compiler config
│   │   ├── package.json            # Dependencies & scripts
│   │   │
│   │   ├── _helpers/
│   │   │   ├── AppError.ts         # Custom error class
│   │   │   ├── db.ts               # Database initialization & model association
│   │   │   └── role.ts             # Role enumeration (Admin, User)
│   │   │
│   │   ├── _middleware/
│   │   │   ├── auth.middleware.ts  # JWT verification, authorization guards
│   │   │   ├── errorHandler.ts     # Global error handling middleware
│   │   │   └── validateRequest.ts  # Request validation middleware
│   │   │
│   │   ├── models/                 # Sequelize models
│   │   │   ├── department.model.ts
│   │   │   ├── employee.model.ts
│   │   │   ├── user.model.ts
│   │   │   ├── request.model.ts
│   │   │   └── request-Item.model.ts
│   │   │
│   │   ├── services/               # Business logic
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── department.service.ts
│   │   │   ├── employee.service.ts
│   │   │   ├── request.service.ts
│   │   │   └── dashboard.service.ts
│   │   │
│   │   ├── controllers/            # Route handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── departments.controller.ts
│   │   │   ├── employees.controller.ts
│   │   │   ├── requests.controller.ts
│   │   │   ├── dashboard.controller.ts
│   │   │   └── content.controller.ts
│   │   │
│   │   └── tests/                  # Test files (placeholder)
│   │
│   ├── README.md                   # Backend-specific documentation
│   ├── package.json
│   ├── tsconfig.json
│   └── config.json
│
└── README.md                        # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** 16+ (verify: `node --version`)
- **MySQL** server running locally or remotely
- **npm** (comes with Node.js)

### Step 1: Clone or Extract the Project

```bash
cd "c:\Users\PJ Pineda\Desktop\myGitHub Files\Gesim_Lab5Activity"
```

### Step 2: Backend Setup

```bash
cd typescript-crud-api

# Install dependencies
npm install

# Configure database connection (edit config.json)
# Update: host, user, password, database
# Example:
# {
#   "host": "localhost",
#   "user": "root",
#   "password": "password",
#   "database": "gesim_db"
# }
```

### Step 3: Database Initialization

1. **Create MySQL database:**

   ```sql
   CREATE DATABASE gesim_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **Start the backend** (see next section) — it will auto-create tables via Sequelize.

   Or manually run migrations if available in `tests/` folder.

### Step 4: Verify Configuration

Ensure `typescript-crud-api/config.json` has correct database credentials:

```json
{
  "host": "localhost",
  "user": "root",
  "password": "your_password",
  "database": "gesim_db",
  "dialect": "mysql"
}
```

---

## ▶️ Running the Application

### Backend

```bash
cd typescript-crud-api

# Development mode (with hot reload)
npm run dev

# Production mode
npm run build && npm start
```

**Default Backend URL**: `http://localhost:5000`

### Frontend

1. Open a browser and navigate to:

   ```
   file:///c:/Users/PJ%20Pineda/Desktop/myGitHub%20Files/Gesim_Lab5Activity/client/index.html
   ```

   Or use a simple HTTP server:

   ```bash
   cd client
   # Using Python 3
   python -m http.server 8000
   # Then open: http://localhost:8000
   ```

2. **First Login**:
   - Use credentials from the database (created during initialization)
   - Default test account: email: `test@example.com`, password: `Test123!` (if seeded)

---

## 🔌 API Endpoints

All endpoints return either `{ message: string, data?: any }` or plain objects. Base URL: `http://localhost:5000/api`

### Authentication

| Method | Endpoint         | Protected | Description                                      |
| ------ | ---------------- | --------- | ------------------------------------------------ |
| POST   | `/auth/login`    | ❌        | Login with email and password, returns JWT token |
| POST   | `/auth/register` | ❌        | Register a new user account                      |

**Example Login Request:**

```bash
POST /api/auth/login
Content-Type: application/json

{ "email": "user@example.com", "password": "Password123!" }
```

**Response:**

```json
{
  "message": "Login successful",
  "data": {
    "id": "uuid-xxx",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { "id": "uuid-xxx", "email": "user@example.com", "role": "User" }
  }
}
```

### Users (Profile Management)

| Method | Endpoint             | Protected | Auth Rule     | Description                    |
| ------ | -------------------- | --------- | ------------- | ------------------------------ |
| GET    | `/users/profile/:id` | ✅        | Self or Admin | Get user profile               |
| PUT    | `/users/profile/:id` | ✅        | Self or Admin | Update user profile            |
| DELETE | `/users/profile/:id` | ✅        | Self or Admin | Delete user profile            |
| POST   | `/users/addAccount`  | ✅        | Admin only    | Admin creates new user account |

**Example Profile Update:**

```bash
PUT /api/users/profile/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{ "email": "newemail@example.com", "password": "NewPass123!" }
```

### Employees

| Method | Endpoint                | Protected | Auth Rule | Description                             |
| ------ | ----------------------- | --------- | --------- | --------------------------------------- |
| GET    | `/employees`            | ✅        | any user  | List all employees with department info |
| POST   | `/employees`            | ✅        | Admin     | Create new employee                     |
| GET    | `/employees/:id`        | ✅        | any user  | Get single employee                     |
| PUT    | `/employees/edit/:id`   | ✅        | Admin     | Update employee                         |
| DELETE | `/employees/delete/:id` | ✅        | Admin     | Delete employee                         |

**Example Get Employees:**

```bash
GET /api/employees
Authorization: Bearer {token}
```

**Response:**

```json
{
  "message": "Employees retrieved successfully",
  "data": [
    {
      "id": "uuid-xxx",
      "name": "John Doe",
      "email": "john@example.com",
      "deptId": "dept-001",
      "Department": {
        "deptId": "dept-001",
        "deptName": "Engineering"
      }
    }
  ]
}
```

### Departments

| Method | Endpoint                  | Protected | Auth Rule | Description          |
| ------ | ------------------------- | --------- | --------- | -------------------- |
| GET    | `/departments`            | ✅        | any user  | List all departments |
| POST   | `/departments`            | ✅        | Admin     | Create department    |
| PUT    | `/departments/edit/:id`   | ✅        | Admin     | Update department    |
| DELETE | `/departments/delete/:id` | ✅        | Admin     | Delete department    |

### Requests (Workflow)

| Method | Endpoint           | Protected | Auth Rule | Description                                      |
| ------ | ------------------ | --------- | --------- | ------------------------------------------------ |
| POST   | `/requests`        | ✅        | any user  | Create a new request (with items in transaction) |
| GET    | `/requests/getAll` | ✅        | any user  | List requests (admin sees all, user sees own)    |
| PUT    | `/requests/:id`    | ✅        | Admin     | Update request status                            |
| DELETE | `/requests/:id`    | ✅        | Admin     | Delete request                                   |

**Example Create Request:**

```bash
POST /api/requests
Authorization: Bearer {token}
Content-Type: application/json

{
  "employeeEmail": "john@example.com",
  "type": "Leave",
  "description": "Annual leave request",
  "items": [
    { "itemDesc": "2 weeks leave", "quantity": 1, "requestDate": "2026-04-15" }
  ]
}
```

**Response:**

```json
{
  "message": "Request created successfully",
  "data": {
    "requestId": "req-xxx",
    "status": "Pending",
    "createdAt": "2026-04-07T..."
  }
}
```

### Dashboard

| Method | Endpoint     | Protected | Auth Rule | Description                  |
| ------ | ------------ | --------- | --------- | ---------------------------- |
| GET    | `/dashboard` | ✅        | any user  | Get dashboard stats (counts) |

**Response:**

```json
{
  "totalUsers": 5,
  "totalEmployees": 20,
  "totalDepartments": 3,
  "pendingRequests": 7,
  "approvedRequests": 15
}
```

### Content (Public)

| Method | Endpoint         | Protected | Description          |
| ------ | ---------------- | --------- | -------------------- |
| GET    | `/content/guest` | ❌        | Public guest content |

**Response:**

```json
{
  "message": "Welcome guest, this content is public."
}
```

---

## 🗄️ Database Schema

### Users Table

```
- id (PK, UUID)
- email (unique, string)
- passwordHash (string - bcrypt)
- role (enum: Admin, User)
- createdAt (timestamp)
- updatedAt (timestamp)
```

### Employees Table

```
- id (PK, UUID)
- name (string)
- email (string)
- deptId (FK → Departments.deptId)
- createdAt (timestamp)
- updatedAt (timestamp)
```

### Departments Table

```
- deptId (PK, string) — e.g., "DEPT-001"
- deptName (string)
- createdAt (timestamp)
- updatedAt (timestamp)
```

### Requests Table

```
- id (PK, UUID)
- employeeEmail (string)
- type (string) — Request type (Leave, Tool, Equipment, etc.)
- description (string)
- status (enum: Pending, Approved, Rejected)
- createdAt (timestamp)
- updatedAt (timestamp)
```

### RequestItems Table

```
- id (PK, UUID)
- requestId (FK → Requests.id)
- itemDesc (string)
- quantity (number)
- requestDate (date)
- createdAt (timestamp)
- updatedAt (timestamp)
```

---

## 👥 User Roles & Permissions

### Admin Role

- ✅ View all employees, departments, and requests
- ✅ Create, edit, delete employees and departments
- ✅ Create user accounts
- ✅ Update request statuses (Approve/Reject)
- ✅ View all user profiles
- ✅ Edit/delete any user profile
- ✅ View employee email in request list

### User Role

- ✅ View employees and departments
- ✅ View own profile
- ✅ Edit own profile
- ✅ Submit requests
- ✅ View own requests only
- ❌ Cannot see employee email in request list
- ❌ Cannot create/edit/delete employees, departments, or other users' profiles

---

## 🔐 Authentication & Authorization

### JWT Token Structure

- **Header**: `Authorization: Bearer {token}`
- **Token Payload**:
  ```json
  {
    "sub": "user-id",
    "email": "user@example.com",
    "role": "Admin",
    "iat": 1649876543,
    "exp": 1649963943
  }
  ```

### Middleware Flow

1. **auth.middleware.ts** - Verifies JWT signature and expiration
2. **Role-based guards**:
   - `authorizeAdmin` - Only Admin role
   - `authorizeSelfOrAdmin` - User can access own data, or Admin can access any data

### Token Storage

- **Frontend**: Stored in `sessionStorage` (clears on browser close) and `localStorage` (persists)
- **Auto-logout**: Scheduled based on token expiration

---

## 🎨 Frontend Features

### Dashboard Page

- Displays key statistics:
  - Total users, employees, departments
  - Pending vs. approved requests
- Responsive card-based layout

### Employee Management

- **List View**: All employees with department names (via join)
- **Edit Modal**: Inline form to update employee details
- **Delete**: Confirm delete with cleanup
- Depends on department dropdown being populated first

### Department Management

- Create, edit, list, and delete departments
- All authenticated users can view; admin can modify

### Request Management

- **User View**:
  - Submit new requests via modal
  - View only own requests
  - Requests table without employee email column
- **Admin View**:
  - View all requests
  - See employee email
  - Update request status (Approve/Reject)

### Profile Management

- Users can view and edit their own profile
- Change email or password (self-service)
- Admin can manage any user profile

### Public Guest Content

- Accessible without authentication
- Displays welcome message

### UI/UX Details

- **Font**: Inter (Google Fonts)
- **Color Scheme**: Modern blues and grays with accent colors
- **Components**: Bootstrap 5 cards, modals, forms
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design with breakpoints

---

## 🔧 Key Implementation Details

### Sequelize Model Associations

```typescript
// Employee belongs to Department
Employee.belongsTo(Department, {
  foreignKey: "deptId",
  targetKey: "deptId",
});

// Department has many Employees
Department.hasMany(Employee, {
  foreignKey: "deptId",
  sourceKey: "deptId",
});
```

**Why it works:**

- Employee's `deptId` is a foreign key pointing to Department's `deptId` (string PK)
- Queries like `Employee.findAll({ include: [Department] })` join and return nested department info

### Transaction-Based Request Creation

```typescript
// Service creates Request + RequestItems in a single transaction
const transaction = await sequelize.transaction();

const request = await Request.create(
  { employeeEmail, type, description, status: "Pending" },
  { transaction },
);

const items = await RequestItem.bulkCreate(
  requestItems.map((item) => ({ ...item, requestId: request.id })),
  { transaction },
);

await transaction.commit();
```

**Benefits:**

- All-or-nothing atomicity: if item creation fails, entire request is rolled back
- No orphaned requests without items

### Frontend API Response Handling

```javascript
// Flexible parsing to support both old and new response shapes
const parseResponse = (res) => {
  return Array.isArray(res) ? res : res.data || res;
};

// Multiple endpoints return { message, data }, others return plain object
```

### Role-Based Conditional Rendering

```html
<!-- Admin-only columns -->
<td class="role-admin">{{ email }}</td>

<!-- CSS hides for non-admin -->
body.is-user .role-admin { display: none; }
```

### Dynamic Column Spanning

```javascript
// Adjust <th> colspan based on visible columns for users vs. admins
const colCount = adminUser ? 6 : 5; // less 1 for hidden email
table.querySelector("thead").colSpan = colCount;
```

---

## 📝 Development Notes

### TypeScript Strict Mode

The project uses strict TypeScript settings (`tsconfig.json`):

- `"strict": true` - Full type checking
- `"exactOptionalPropertyTypes": true` - Stricter optional property handling
- `"noUncheckedIndexedAccess": true` - Index access requires type safety

**Best Practice**: Always declare property types explicitly.

### Error Handling

- **AppError** class wraps all errors:
  ```typescript
  throw new AppError(message, statusCode);
  ```
- **Global error handler** in `errorHandler.ts` catches and formats errors uniformly

### Package Scripts

```json
{
  "dev": "nodemon --exec ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

**Usage:**

- Development: `npm run dev` (auto-restart on file changes)
- Production: `npm run build && npm start`

### Testing Recommendations

- Add Jest or Mocha tests in `tests/` folder
- Test each service method with sample data
- Mock database calls for unit tests
- E2E tests: login → create request → verify status → logout

### Common Issues & Fixes

| Issue                        | Cause                                    | Fix                                                  |
| ---------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| "Cannot find module"         | Missing dependency                       | `npm install`                                        |
| "Database connection failed" | Wrong `config.json` credentials          | Update `config.json` with correct DB info            |
| "Employees not showing"      | Frontend parsing expects different shape | Ensure service returns `{ message, data: [...] }`    |
| "Edit/delete fails"          | Wrong endpoint or missing role auth      | Check URL and middleware guards                      |
| "Email visible for user"     | CSS not hiding column                    | Verify `body.is-user .role-admin { display: none; }` |

---

## 🤝 Contributing

1. **Create a feature branch**: `git checkout -b feature/your-feature`
2. **Write tests** for new functionality
3. **Follow TypeScript strict mode** conventions
4. **Commit with clear messages**: `git commit -m "Add: feature description"`
5. **Push and create a pull request**

---

## 📄 License

This project is part of Lab 5 and is provided as-is for educational purposes.

---

## 📞 Support & Questions

For questions or issues:

1. Check the [API Endpoints](#api-endpoints) section
2. Review the [Database Schema](#database-schema)
3. Inspect `src/controllers/` for route logic
4. Check `client/script.js` for frontend call examples

---

**Last Updated**: April 7, 2026  
**Project Version**: 1.0.0 (with dashboard, requests, and guest content endpoints)
