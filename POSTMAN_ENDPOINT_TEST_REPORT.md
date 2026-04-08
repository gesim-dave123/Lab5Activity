# Postman Endpoint Test Report

This document lists the API endpoints currently implemented in the backend and a Postman-friendly test matrix with inputs and expected success results.

## Test Setup

- Base URL: `http://localhost:3000/api`
- Content type for JSON bodies: `Content-Type: application/json`
- For protected endpoints, include:
  - `Authorization: Bearer <JWT_TOKEN>`
- Get `<JWT_TOKEN>` from `POST /auth/login`.

---

## 1. System and Public Endpoints

### 1.1 GET /test

- Full URL: `http://localhost:3000/api/test`
- Auth: No
- Input:
  - Headers: None required
  - Body: None
- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "Hello, World!" }
```

### 1.2 GET /content/guest

- Full URL: `http://localhost:3000/api/content/guest`
- Auth: No
- Input:
  - Headers: None required
  - Body: None
- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "Welcome guest, this content is public." }
```

---

## 2. Authentication Endpoints

### 2.1 POST /auth/register

- Full URL: `http://localhost:3000/api/auth/register`
- Auth: No
- Input:
  - Headers: `Content-Type: application/json`
  - Body:

```json
{
  "email": "demo@example.com",
  "title": "Mr",
  "firstName": "Demo",
  "lastName": "User",
  "username": "demo.user",
  "role": "User",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

- Expected result:
  - Status: `201`
  - Body:

```json
{ "message": "User registered successfully" }
```

### 2.2 POST /auth/login

- Full URL: `http://localhost:3000/api/auth/login`
- Auth: No
- Input:
  - Headers: `Content-Type: application/json`
  - Body:

```json
{
  "email": "demo@example.com",
  "password": "Password123"
}
```

- Expected result:
  - Status: `200`
  - Body:

```json
{
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "email": "demo@example.com",
    "title": "Mr",
    "firstName": "Demo",
    "lastName": "User",
    "role": "User"
  }
}
```

### 2.3 POST /auth/verifyEmail

- Full URL: `http://localhost:3000/api/auth/verifyEmail`
- Auth: No
- Input:
  - Headers: `Content-Type: application/json`
  - Body:

```json
{
  "email": "demo@example.com"
}
```

- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "Email verified successfully" }
```

---

## 3. User Endpoints

### 3.1 GET /users

- Full URL: `http://localhost:3000/api/users`
- Auth: Yes (Admin)
- Input:
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Body: None
- Expected result:
  - Status: `200`
  - Body: Array of user objects

```json
[
  {
    "id": 1,
    "email": "demo@example.com",
    "title": "Mr",
    "firstName": "Demo",
    "lastName": "User",
    "username": "demo.user",
    "role": "User",
    "verified": true,
    "createdAt": "2026-04-08T00:00:00.000Z",
    "updatedAt": "2026-04-08T00:00:00.000Z"
  }
]
```

### 3.2 GET /users/profile/:id

- Full URL example: `http://localhost:3000/api/users/profile/1`
- Auth: Yes (Self or Admin)
- Input:
  - Path param: `id` (number)
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
- Expected result:
  - Status: `200`
  - Body: Single user object

### 3.3 POST /users/addAccount

- Full URL: `http://localhost:3000/api/users/addAccount`
- Auth: Yes (Admin)
- Input:
  - Headers:
    - `Authorization: Bearer <JWT_TOKEN>`
    - `Content-Type: application/json`
  - Body:

```json
{
  "email": "new.user@example.com",
  "title": "Ms",
  "firstName": "New",
  "lastName": "User",
  "username": "new.user",
  "role": "User",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "User created successfully" }
```

### 3.4 PUT /users/profile/:id

- Full URL example: `http://localhost:3000/api/users/profile/1`
- Auth: Yes (Self or Admin)
- Input:
  - Path param: `id` (number)
  - Headers:
    - `Authorization: Bearer <JWT_TOKEN>`
    - `Content-Type: application/json`
  - Body (partial update):

```json
{
  "firstName": "Updated",
  "lastName": "Name",
  "username": "updated.user"
}
```

- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "User updated successfully" }
```

### 3.5 DELETE /users/profile/:id

- Full URL example: `http://localhost:3000/api/users/profile/1`
- Auth: Yes (Self or Admin)
- Input:
  - Path param: `id` (number)
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "User deleted successfully" }
```

---

## 4. Department Endpoints

### 4.1 GET /departments

- Full URL: `http://localhost:3000/api/departments`
- Auth: Yes (Admin)
- Input:
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
- Expected result:
  - Status: `200`
  - Body: Array of department objects

### 4.2 POST /departments/create

- Full URL: `http://localhost:3000/api/departments/create`
- Auth: Yes (Admin)
- Input:
  - Headers:
    - `Authorization: Bearer <JWT_TOKEN>`
    - `Content-Type: application/json`
  - Body:

```json
{
  "deptName": "Engineering",
  "description": "Handles product engineering"
}
```

- Expected result:
  - Status: `201`
  - Body:

```json
{ "message": "Department created successfully" }
```

### 4.3 PUT /departments/edit/:id

- Full URL example: `http://localhost:3000/api/departments/edit/1`
- Auth: Yes (Admin)
- Input:
  - Path param: `id` (number)
  - Headers:
    - `Authorization: Bearer <JWT_TOKEN>`
    - `Content-Type: application/json`
  - Body:

```json
{
  "deptName": "Engineering",
  "description": "Updated department description"
}
```

- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "Department updated successfully" }
```

### 4.4 DELETE /departments/delete/:id

- Full URL example: `http://localhost:3000/api/departments/delete/1`
- Auth: Yes (Admin)
- Input:
  - Path param: `id` (number)
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "Department deleted successfully" }
```

---

## 5. Employee Endpoints

### 5.1 GET /employees

- Full URL: `http://localhost:3000/api/employees`
- Auth: Yes (Admin)
- Input:
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
- Expected result:
  - Status: `200`
  - Body:

```json
{
  "message": "Employees retrieved successfully",
  "data": [
    {
      "id": 1,
      "email": "demo@example.com",
      "position": "Developer",
      "deptId": 1,
      "department": {
        "deptId": 1,
        "deptName": "Engineering"
      }
    }
  ]
}
```

### 5.2 GET /employees/getById/:id

- Full URL example: `http://localhost:3000/api/employees/getById/1`
- Auth: Yes (Admin)
- Input:
  - Path param: `id` (number)
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
- Expected result:
  - Status: `200`
  - Body:

```json
{
  "message": "Employee retrieved successfully",
  "data": {
    "id": 1,
    "email": "demo@example.com",
    "position": "Developer",
    "deptId": 1
  }
}
```

### 5.3 POST /employees/create

- Full URL: `http://localhost:3000/api/employees/create`
- Auth: Yes (Admin)
- Input:
  - Headers:
    - `Authorization: Bearer <JWT_TOKEN>`
    - `Content-Type: application/json`
  - Body:

```json
{
  "position": "Developer",
  "email": "demo@example.com",
  "deptId": 1
}
```

- Expected result:
  - Status: `201`
  - Body:

```json
{ "message": "Employee created successfully" }
```

### 5.4 PUT /employees/edit/:id

- Full URL example: `http://localhost:3000/api/employees/edit/1`
- Auth: Yes (Admin)
- Input:
  - Path param: `id` (number)
  - Headers:
    - `Authorization: Bearer <JWT_TOKEN>`
    - `Content-Type: application/json`
  - Body (any subset):

```json
{
  "position": "Senior Developer"
}
```

- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "Employee updated successfully" }
```

### 5.5 DELETE /employees/delete/:id

- Full URL example: `http://localhost:3000/api/employees/delete/1`
- Auth: Yes (Admin)
- Input:
  - Path param: `id` (number)
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "Employee deleted successfully" }
```

---

## 6. Request Endpoints

### 6.1 POST /requests

- Full URL: `http://localhost:3000/api/requests`
- Auth: Yes (User or Admin)
- Input:
  - Headers:
    - `Authorization: Bearer <JWT_TOKEN>`
    - `Content-Type: application/json`
  - Body:

```json
{
  "type": "Equipment",
  "items": [
    { "name": "Laptop", "qty": 1 },
    { "name": "Monitor", "qty": 2 }
  ]
}
```

- Expected result:
  - Status: `201`
  - Body:

```json
{ "message": "Request created successfully" }
```

### 6.2 GET /requests/getAll

- Full URL: `http://localhost:3000/api/requests/getAll`
- Auth: Yes (User or Admin)
- Input:
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
- Expected result:
  - Status: `200`
  - Body:

```json
{
  "message": "Requests retrieved successfully",
  "data": [
    {
      "requestId": 1,
      "type": "Equipment",
      "status": "Pending",
      "employeeEmail": "demo@example.com",
      "items": [
        { "itemId": 1, "itemName": "Laptop", "quantity": 1, "requestId": 1 }
      ]
    }
  ]
}
```

### 6.3 PATCH /requests/updateStatus/:id

- Full URL example: `http://localhost:3000/api/requests/updateStatus/1`
- Auth: Yes (Admin)
- Input:
  - Path param: `id` (number)
  - Headers:
    - `Authorization: Bearer <JWT_TOKEN>`
    - `Content-Type: application/json`
  - Body:

```json
{ "status": "Approved" }
```

- Expected result:
  - Status: `200`
  - Body:

```json
{ "message": "Request status updated successfully" }
```

---

## 7. Dashboard Endpoint

### 7.1 GET /dashboard

- Full URL: `http://localhost:3000/api/dashboard`
- Auth: Yes (Admin)
- Input:
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
- Expected result:
  - Status: `200`
  - Body:

```json
{
  "totalUsers": 5,
  "totalEmployees": 3,
  "totalDepartments": 2,
  "totalRequests": 10,
  "pendingRequests": 4,
  "approvedRequests": 6
}
```

---

## Notes

- The endpoint list and expected success responses in this report are aligned with the current controller and service implementation in `server/src`.
- If you want strictly "actual run" results, execute the same requests in Postman and add a new column named `Actual Result` with the exact response captured from your environment.
