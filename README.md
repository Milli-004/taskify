# 📋 Taskify - Modern Task Management Application

A full-stack task management application built with **React**, **Redux**, **Spring Boot**, and **MongoDB**. Features a beautiful glassmorphic UI with modern animations and complete CRUD operations.
Java Full Stack Website made by the team of 2
## 🌟 Features

### Frontend Features
- ✅ **User Authentication** - Secure login and registration
- ✅ **Task Management** - Create, Read, Update, Delete tasks
- ✅ **Task Priorities** - High, Medium, Low priority levels
- ✅ **Task Categories** - Organize tasks by categories
- ✅ **Task Status** - To Do, In Progress, Completed
- ✅ **Search & Filter** - Search tasks and filter by status/priority
- ✅ **Due Dates** - Set and track task deadlines
- ✅ **Progress Dashboard** - Visual progress tracking with charts
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Glassmorphic UI** - Modern, beautiful interface with animations

### Backend Features
- ✅ **RESTful API** - Clean API architecture
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - BCrypt encryption
- ✅ **MongoDB Integration** - NoSQL database
- ✅ **Input Validation** - Server-side validation
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **CORS Configuration** - Cross-origin resource sharing
- ✅ **Statistics Endpoint** - Task analytics API

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **React Chart.js 2** - Chart components

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.1.4** - Backend framework
- **Spring Security** - Authentication & authorization
- **Spring Data MongoDB** - Database integration
- **JWT (jjwt 0.11.5)** - Token generation
- **BCrypt** - Password encryption
- **Maven** - Build tool

### Database
- **MongoDB** - NoSQL database

## 📁 Project Structure

```
taskify/
├── backend/
│   ├── src/main/java/com/taskify/
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   └── TaskController.java
│   │   ├── model/
│   │   │   ├── User.java
│   │   │   └── Task.java
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   └── TaskRepository.java
│   │   ├── util/
│   │   │   └── JwtUtil.java
│   │   ├── config/
│   │   │   └── WebConfig.java
│   │   ├── SecurityConfig.java
│   │   └── TaskifyApplication.java
│   ├── src/main/resources/
│   │   └── application.yml
│   ├── pom.xml
│   ├── Dockerfile
│   └── Procfile
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── AuthPage.jsx
│   │   │   │   └── AuthPage.css
│   │   │   ├── TaskBoard/
│   │   │   │   └── TaskBoard.jsx
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.jsx
│   │   │   └── TaskModal/
│   │   │       ├── TaskModal.jsx
│   │   │       └── TaskModal.css
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   └── authSlice.js
│   │   │   └── tasks/
│   │   │       └── tasksSlice.js
│   │   ├── store/
│   │   │   └── store.js
│   │   ├── api/
│   │   │   └── axiosConfig.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Node.js 16** or higher
- **MongoDB** (local or Atlas)
- **Maven** (or use Maven wrapper)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd taskify/backend
   ```

2. **Set environment variables:**
   Create `.env` file or set system variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/taskify
   JWT_SECRET=YourSecretKeyHere1234567890ChangeThis
   PORT=8080
   ```

3. **Build the project:**
   ```bash
   mvn clean install
   ```

4. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

   Or run the JAR:
   ```bash
   java -jar target/backend-0.0.1-SNAPSHOT.jar
   ```

5. **Backend will be running on:** `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd taskify/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set environment variables:**
   Create `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. **Run the development server:**
   ```bash
   npm start
   ```

5. **Frontend will be running on:** `http://localhost:3000`

### MongoDB Setup

#### Option 1: Local MongoDB
```bash
# Install MongoDB and start service
mongod --dbpath /path/to/data/directory
```

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/verify` | Verify JWT token |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/user/{userId}` | Get all tasks for user |
| GET | `/api/tasks/user/{userId}/filter` | Filter tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |
| GET | `/api/tasks/stats/{userId}` | Get task statistics |

### Filter Parameters
- `status` - todo, in-progress, completed
- `priority` - low, medium, high
- `category` - any string
- `search` - search in title and description

## 🔒 Security Features

1. **Password Encryption** - BCrypt hashing
2. **JWT Authentication** - Secure token-based auth
3. **CORS Configuration** - Controlled access
4. **Input Validation** - Server-side validation
5. **SQL Injection Prevention** - MongoDB parameterized queries

## 🎨 UI Features

- **Glassmorphism Design** - Modern frosted glass effect
- **Animated Gradients** - Dynamic background colors
- **Smooth Transitions** - Polished animations
- **Responsive Layout** - Mobile-first design
- **Custom Checkboxes** - Animated task completion
- **Modal Dialogs** - Task editing interface
- **Progress Charts** - Visual statistics
- **Status Badges** - Color-coded task states
- **Priority Indicators** - High/Medium/Low markers

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🐳 Docker Deployment

### Build Backend Image
```bash
cd backend
docker build -t taskify-backend .
```

### Run with Docker Compose
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/taskify
      - JWT_SECRET=YourSecretKey
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

## 🌐 Deployment

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy using Git or Docker
3. Configure MongoDB URI

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set `REACT_APP_API_URL` environment variable
4. Deploy

## 🧪 Testing

### Manual Testing
1. Register a new account
2. Login with credentials
3. Create tasks with different priorities
4. Edit tasks
5. Mark tasks as complete
6. Use search and filters
7. Check dashboard statistics
8. Test responsive design

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Made by : Milli Srivastava
Snehil Singh

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- MongoDB Documentation
- Chart.js Documentation
- Community tutorials and resources


**Made with ❤️ for College Project**
