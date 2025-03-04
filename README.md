# 📝 Full-Stack Task Manager App

This is a **full-stack task management application** built with:
- **Frontend**: React + TypeScript + Bootstrap
- **Backend**: Node.js + Express + PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

This project allows users to:
- **Register/Login**
- **Create, View, Edit, and Delete Tasks**
- **Mark Tasks as Complete**
- **Only authenticated users can perform task operations**

---

## 🚀 Getting Started

### **1️⃣ Prerequisites**
Before running the project, ensure you have:
- **Node.js** (v16+ recommended) - [Download Here](https://nodejs.org/)
- **npm** (Comes with Node.js) or **yarn**
- **PostgreSQL** (v13+ recommended) - [Download Here](https://www.postgresql.org/)

---

### **2️⃣ Set Up PostgreSQL Database**
### **🔹 Create a PostgreSQL Database**
1. Open a **terminal** and login to PostgreSQL:
   ```sh
   psql -U postgres
   ```
2. Create database task_app:
   ```sh
   CREATE DATABASE task_app;
   ```
3. Exit postgres
   ```sh   
   \q
   ```

---

### **3️⃣ Clone the repositry**

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/task-manager.git
cd task-manager
```

---

## **🖥️ Frontend Setup**
📂 Navigate to the `frontend` folder and follow these steps:

```sh
cd task-app-frontend
npm install
npm run start
```

🔹 The frontend will start at: http://localhost:3000

---

## **🖥️ Backend Setup**
📂 Navigate to the `backend` folder and follow these steps:

```sh
cd task-app-backend
npm install
```

🔹 Set Up Environment Variables
Create a .env file inside the backend folder:
```.env
PORT=5001
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=task-app
DB_PORT=5432
JWT_SECRET=your_secret_key_here
```

🔹 Run Database Migration
Ensure PostgreSQL is running, then create tables:

The following command will create tables in the db
```sh
node migration.js
```
🔹 Start the Backend Server
```sh
npm run dev
```

🔹 The backend will start at:
http://localhost:5001

📌 API Endpoints
|Method |	Endpoint |	Description |
|-------|----------|--------------|
|POST	| /api/auth/register |	Register a new user |
|POST	| /api/auth/login |	Authenticate user and return JWT |
|GET | /api/tasks |	Get all tasks for the logged-in user |
|POST |	/api/tasks |	Create a new task |
|PUT |	/api/tasks/:id |	Update task (title, description, completion) |
|DELETE |	/api/tasks/:id |	Delete a task |

🎨 Features  
✅ User Authentication (Login & Logout)  
✅ Password Hashing with Bcrypt  
✅ JWT-Based Authentication for Secure Routes  
✅ Task CRUD Operations (Create, Read, Update, Delete)  
✅ Mark Tasks as Complete  
✅ Responsive UI with Bootstrap  
✅ Protected Routes for Logged-in Users  

📌 Troubleshooting  
🔹 Issue: npm start fails
Solution: Delete node_modules and reinstall dependencies:
```sh
rm -rf node_modules package-lock.json
npm install
npm start
```

🔹 Issue: Cannot connect to PostgreSQL
Solution: Ensure PostgreSQL is running and your .env values are correct.  

🔹 Issue: Tables are missing
Solution: Run the migration script again:  
```sh
node migration.js
```
---

Salary Expectations: 25$-28$ per hour

---

Demo Video Link: https://youtu.be/RUzvl_qQI_s  