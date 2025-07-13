Project Setup Instructions
This project includes a Node.js backend and a Vite + TypeScript frontend.

🔧 Installation Steps
1. Clone the Repository
bash
Copy
Edit
git clone <your-repo-url>
cd <your-repo-folder>
2. Install Dependencies
Backend
bash
Copy
Edit
cd backend
npm install
Frontend
bash
Copy
Edit
cd ../frontend
npm install
🚀 Running the Project
1. Add Environment Variables
You will receive the following via email:

MongoDB URI

JWT Access Token

Username and Password

Create a .env file in the backend/ directory and add:

env
Copy
Edit
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
Replace <your-mongodb-uri> and <your-jwt-secret> with the actual values provided.

2. Start the Project
Start Backend First
bash
Copy
Edit
cd backend
npm start
Start Frontend After Backend
bash
Copy
Edit
cd ../frontend
npm run dev
📦 Tech Stack
Backend: Node.js, Express, MongoDB

Frontend: Vite, React, TypeScript

