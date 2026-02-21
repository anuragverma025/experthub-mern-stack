# ExpertHub - Expert Booking Platform

## 🚀 Features
- **User Authentication:** Secure Login and Registration for Clients and Experts.
- **Role-based Access:** Different views for Clients and Experts.
- **Database:** MongoDB for persistent storage of users and expert profiles.
- **Styling:** Modern UI built with Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)

## ⚙️ Setup Instructions
1. Clone the repository: `git clone <your-repo-url>`
2. Install dependencies:
   - Root: `npm install`
   - Server: `cd server && npm install`
   - Client: `cd client && npm install`
3. Create a `.env` file in the `server` folder with:
   - `MONGO_URI=your_mongodb_connection_string`
   - `PORT=5000`
4. Run the app: `npm run dev` (from root) or `npm start`