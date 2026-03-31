# TypeScript CRUD API - User Management System

A beginner-friendly REST API for managing users with TypeScript, Express.js, and MySQL.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Make sure MySQL is running
# Windows: Check Services
# macOS: mysql.server start

# 3. Start development server
npm run dev

# 4. Test the API
curl http://localhost:3000/api/users
```

**Server will run at:** `http://localhost:3000`

---

## ⚙️ Setup

Follow these steps from a fresh clone.

### 1. Prerequisites

- Node.js 18+ and npm
- MySQL Server running locally

Check versions:

```bash
node --version
npm --version
mysql --version
```

### 2. Install project dependencies

```bash
npm install
```

### 3. Configure database

Open `config.json` and confirm your local MySQL settings:

```json
{
  "database": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "typescript_crud_api"
  },
  "jwtsecret": "change_this_in_production-123!"
}
```

If your MySQL has a password, set it in `config.json`.

### 4. Start MySQL

- Windows: open Services and start/restart MySQL
- macOS: `mysql.server start`
- Linux: `sudo systemctl start mysql`

### 5. Start the API in development mode

```bash
npm run dev
```

Expected logs include:

- `Database initialized and model synced`
- `Server is running on port ...`

### 6. Confirm API is running

```bash
curl http://localhost:3000/api/test
```

Expected response:

```json
{ "message": "Hello, World!" }
```

## 🎯 What This Project Does

This is a **User Management API** that lets you:

- ✅ Create new users
- ✅ Read user information
- ✅ Update user details
- ✅ Delete users
- ✅ Store data securely in MySQL

**Real-world use:** A backend system for any app that needs to manage user accounts.

---

## 📋 API Endpoints

```
GET    /api/users           → Get all users
GET    /api/users/:id       → Get specific user
POST   /api/users           → Create new user
PUT    /api/users/:id       → Update user
DELETE /api/users/:id       → Delete user
GET    /api/test            → Test endpoint
```

### Quick Test

```bash
# Get all users
curl http://localhost:3000/api/users

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "firstName": "Test",
    "lastName": "User",
    "title": "Mr",
    "role": "User"
  }'
```

---

## 🛠️ Tech Stack

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| **TypeScript**   | Safe, typed JavaScript         |
| **Express.js**   | Web framework                  |
| **MySQL**        | Database                       |
| **Sequelize**    | Database ORM                   |
| **bcryptjs**     | Password encryption            |
| **Joi**          | Input validation               |
| **jsonwebtoken** | Authentication tokens          |
| **Nodemon**      | Auto-reload during development |

---

## 📂 Project Structure

```
src/
├── server.ts                 # Main entry point
├── _helpers/
│   ├── db.ts                 # Database setup
│   └── role.ts               # User roles
├── _middleware/
│   ├── errorHandler.ts       # Error handling
│   └── validateRequest.ts    # Input validation
└── users/
    ├── user.model.ts         # Database schema
    ├── user.service.ts       # Business logic
    └── users.controller.ts   # API routes
```

---

## 🔧 Common Commands

```bash
# Development with auto-reload
npm run dev

# Compile TypeScript to JavaScript
npm run build

# Run production server
npm start

# Run tests
npm test
```

---

## 🧪 Testing with Postman

Follow this step-by-step guide to test all API endpoints in Postman.

### Setup Postman

1. **Download Postman:** https://www.postman.com/
2. **Open Postman** and create a new workspace (or use default)
3. **Create a new HTTP request** (click "+" or "New")

### Test Flow (in order)

#### 1. Test Server Health

- **Method:** GET
- **URL:** `http://localhost:3000/api/test`
- **Click Send**
- **Expected:** `{ "message": "Hello, World!" }`

#### 2. Create a User

- **Method:** POST
- **URL:** `http://localhost:3000/api/users`
- **Headers:** Add `Content-Type: application/json`
- **Body:** Go to "Body" tab → select "raw" → paste:

```json
{
  "email": "demo@example.com",
  "password": "Password123",
  "title": "Mr",
  "firstName": "Demo",
  "lastName": "User",
  "role": "User",
  "confirmPassword": "Password123"
}
```

- **Click Send**
- **Expected:** `{ "message": "User created successfully" }`
- **Note the user ID** from the database (usually 1 for first user)

#### 3. Get All Users

- **Method:** GET
- **URL:** `http://localhost:3000/api/users`
- **Click Send**
- **Expected:** Array with your newly created user

#### 4. Get One User

- **Method:** GET
- **URL:** `http://localhost:3000/api/users/1` (replace `1` with actual user ID)
- **Click Send**
- **Expected:** Single user object

#### 5. Update User

- **Method:** PUT
- **URL:** `http://localhost:3000/api/users/1` (replace `1` with actual user ID)
- **Headers:** Add `Content-Type: application/json`
- **Body:** (raw)

```json
{
  "firstName": "UpdatedName",
  "email": "newemail@example.com"
}
```

- **Click Send**
- **Expected:** `{ "message": "User updated successfully" }`

#### 6. Delete User

- **Method:** DELETE
- **URL:** `http://localhost:3000/api/users/1` (replace `1` with actual user ID)
- **Click Send**
- **Expected:** `{ "message": "User deleted successfully" }`

### Run Project Tests

This project has automated tests in `package.json`:

```bash
npm test
```

This runs:

```bash
ts-node tests/users.test.ts
```

**If tests fail:**

- Confirm MySQL is running
- Verify `config.json` database credentials
- Ensure `npm install` completed without errors
- Check that the server is not already running on port 3000

---

## ⚠️ Troubleshooting

### Error: "Failed to initialize database: code: 'ECONNREFUSED'"

**Solution:** MySQL is not running or not configured correctly.

1. Check MySQL is running

   ```bash
   mysql -u root
   ```

2. Verify config.json settings

   ```json
   {
     "database": {
       "host": "localhost",
       "port": 3306,
       "user": "root",
       "password": "",
       "database": "typescript_crud_api"
     }
   }
   ```

3. Restart MySQL
   - Windows: Services → MySQL → Restart
   - macOS: `mysql.server restart`

**For more issues:** See [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) Troubleshooting section

---

## 📚 Learning Path

**Beginner:**

1. Read [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) - Get it running
2. Test all endpoints with curl
3. Read [DOCUMENTATION.md](DOCUMENTATION.md) - Understand what's happening

**Intermediate:**

1. Study [CODE_EXAMPLES.md](CODE_EXAMPLES.md) - Learn the architecture
2. Modify a user field in [src/users/user.model.ts](src/users/user.model.ts)
3. Add a new API endpoint

**Advanced:**

1. Add role-based access control
2. Implement JWT authentication
3. Add password reset functionality
4. Deploy to cloud (Azure, AWS, etc.)

---

## 🔑 Key Features

✅ **Type-Safe** - TypeScript catches errors before runtime
✅ **Secure Passwords** - Uses bcryptjs for encryption
✅ **Input Validation** - Joi validates all incoming data
✅ **Clean Code** - Organized, professional structure
✅ **Error Handling** - Centralized error management
✅ **Auto-Reload** - Nodemon reloads on file changes
✅ **Database ORM** - Sequelize for safe database operations
✅ **CORS Support** - Allow cross-origin requests

---

## 📖 File Guide

### Understanding Different Files

| File                  | What It Does                               |
| --------------------- | ------------------------------------------ |
| `server.ts`           | Starts the web server                      |
| `db.ts`               | Connects to MySQL                          |
| `user.model.ts`       | Defines User database structure            |
| `user.service.ts`     | Contains user creation/update/delete logic |
| `users.controller.ts` | Handles API requests (GET, POST, etc.)     |
| `validateRequest.ts`  | Checks if incoming data is valid           |
| `errorHandler.ts`     | Catches and formats error messages         |
| `config.json`         | Database connection settings               |
| `package.json`        | Project info and dependencies              |

---

## 🚀 Next Steps

### 1. **Get It Running** ✅

- Follow [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
- Test all endpoints

### 2. **Understand It** 📚

- Read [DOCUMENTATION.md](DOCUMENTATION.md)
- Study [CODE_EXAMPLES.md](CODE_EXAMPLES.md)

### 3. **Modify It** 🔧

- Add new user fields to [src/users/user.model.ts](src/users/user.model.ts)
- Add new endpoints to [src/users/users.controller.ts](src/users/users.controller.ts)
- Add business logic to [src/users/user.service.ts](src/users/user.service.ts)

### 4. **Enhance It** 🎨

- Add authentication (JWT tokens)
- Add role-based access control
- Add password reset functionality
- Add image upload
- Add email notifications

### 5. **Deploy It** 🌐

- Push to GitHub
- Deploy to Azure, AWS, or Heroku
- Use Postman for API testing

---

## 🤝 Using Postman for Testing

1. Download: https://www.postman.com/
2. Create a new request
3. Set method (GET, POST, etc.)
4. Enter URL: `http://localhost:3000/api/users`
5. Add JSON data in Body (for POST/PUT)
6. Click Send

Much easier than curl!

---

## 🔒 Security Notes

⚠️ **This is for learning/development only.**

Before deploying to production:

- [ ] Change JWT secret in config.json
- [ ] Use environment variables (.env)
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Use strong password requirements
- [ ] Add rate limiting
- [ ] Add login authentication
- [ ] Use real database credentials
- [ ] Enable input rate limiting
- [ ] Add logging and monitoring

---

## 📞 Common Questions

**Q: Can I use PostgreSQL instead of MySQL?**
A: Yes! Change the dialect in db.ts and install postgres driver.

**Q: How do I add authentication?**
A: Implement JWT in user.service.ts. See CODE_EXAMPLES.md for details.

**Q: How do I add new database fields?**
A: Edit user.model.ts, restart server, database updates automatically.

**Q: Can I use this in production?**
A: Only after adding security features (JWT, HTTPS, environment variables, etc.)

**Q: How do I deploy this?**
A: See DOCUMENTATION.md for deployment guides.

---

## 🎓 Learning Resources

- **Express.js:** https://expressjs.com/
- **TypeScript:** https://www.typescriptlang.org/
- **Sequelize:** https://sequelize.org/
- **MySQL:** https://dev.mysql.com/doc/
- **REST API Best Practices:** https://restfulapi.net/
- **Postman Learning:** https://learning.postman.com/

---

## 📝 Documentation Map

```
Root/
├── README.md                    ← YOU ARE HERE
├── SETUP_CHECKLIST.md          ← First time setup
├── DOCUMENTATION.md            ← Complete guide
├── QUICK_REFERENCE.md          ← Quick lookup
└── CODE_EXAMPLES.md            ← Code examples & architecture
```

**Pick a document above based on what you need!**

---

## ❓ Getting Help

1. **Setup issues?** → [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)
2. **How does it work?** → [DOCUMENTATION.md](DOCUMENTATION.md)
3. **Quick commands?** → [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
4. **Code examples?** → [CODE_EXAMPLES.md](CODE_EXAMPLES.md)
5. **Still stuck?** → Check error messages, they often explain the problem!

---

**Happy Coding! 🚀**

Start with [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) if you're new to this project.
