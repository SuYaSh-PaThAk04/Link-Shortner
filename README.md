URL Shortener with Admin Dashboard
A simple Node.js + Express + MongoDB URL shortener application with an Admin Dashboard to view all shortened links.
The project allows users to shorten long URLs and provides an admin interface to manage and monitor all shortened links.

🚀 Features
Shorten any long URL into a short, shareable link.

Automatic redirect from short link to the original URL.

Admin dashboard to list all shortened URLs.

MongoDB database for storing URL mappings.

Fully tested with Postman.

🛠 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Frontend (Admin): React + Axios

Testing: Postman

📂 Project Structure
bash
Copy
Edit
project/
├── backend/
│   ├── routes/
│   │   ├── urlRoutes.js       # URL shortening and redirect routes
│   │   ├── adminRoutes.js     # Admin dashboard API
│   ├── models/
│   │   └── Url.js             # Mongoose model for URLs
│   ├── server.js              # Express app entry point
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── pages/Admin.jsx    # Admin dashboard page
│   │   └── App.jsx            # Main React app
│   └── package.json
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file inside the backend folder:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/urlShortener
BASE_URL=http://localhost:5000
Start the backend:

bash
Copy
Edit
npm start
3️⃣ Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
Create a .env file inside the frontend folder:

env
Copy
Edit
VITE_API_URL=http://localhost:5000
Start the frontend:

bash
Copy
Edit
npm run dev
📌 API Endpoints
Shorten a URL
http
Copy
Edit
POST /shorten
Content-Type: application/json

{
  "longUrl": "https://example.com"
}
Response

json
Copy
Edit
{
  "shortUrl": "http://localhost:5000/abc123"
}
Redirect to Original URL
http
Copy
Edit
GET /:shortId
Redirects to the original URL.

Admin - Get All URLs
http
Copy
Edit
GET /admin
Response

json
Copy
Edit
[
  {
    "_id": "64a7e9d9f9d4f9a9c0a8b123",
    "longUrl": "https://example.com",
    "shortId": "abc123",
    "clicks": 5
  }
]
📬 Testing with Postman
You can test all backend routes using Postman by sending requests to:

arduino
Copy
Edit
http://localhost:5000
🖼 Admin Dashboard Preview
The admin dashboard lists all shortened links with their click count.
