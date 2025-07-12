# 🧠 AlgoVista – DSA Visualizer & Personalized Practice Tracker

[![Netlify Status](https://img.shields.io/badge/frontend-Netlify-brightgreen)](https://netlify.com)
[![Render Status](https://img.shields.io/badge/backend-Render-blue)](https://render.com)
[![MongoDB Atlas](https://img.shields.io/badge/database-MongoDB%20Atlas-green)](https://www.mongodb.com/atlas)
[![MIT License](https://img.shields.io/badge/license-MIT-lightgrey)](#license)

> A full-stack web application to visualize Data Structures and Algorithms, track coding practice across platforms like LeetCode and Codeforces, and receive AI-powered recommendations for consistent improvement.

## 🔗 Live Demo

🌐 [Try AlgoVista Live](https://algovista10.netlify.app/) *(Update with actual link)*

## 📂 Overview

AlgoVista is an interactive platform designed for developers to master Data Structures and Algorithms (DSA). It offers dynamic visualizations, progress tracking, and personalized problem recommendations powered by AI, making it ideal for students, competitive programmers, and professionals.

## ✨ Features

- 🔍 **DSA Visualizer**: Interactive animations for Sorting, Trees, Graphs, and more using D3.js and p5.js.
- 📊 **Personalized Practice Tracker**: Monitor daily solves, streaks, and topic-wise progress.
- 🌐 **LeetCode & Codeforces Sync**: Fetch submissions and stats via official APIs.
- 🤖 **AI Coach**: Receive tailored problem recommendations based on weak areas.
- 🕓 **Version Control**: Review past solutions with timestamps.
- 🔐 **Secure Authentication**: Login with JWT.
- 📅 **Activity Heatmap**: Visualize daily solve activity, GitHub-style.

## 🚀 Tech Stack

| Category            | Technologies                                    |
|---------------------|-------------------------------------------------|
| **Frontend**        | React, Vite, TailwindCSS                        |
| **Visualizer**      | D3.js, p5.js                                    |
| **Backend**         | Node.js, Express.js                             |
| **Database**        | MongoDB Atlas                                   |
| **Authentication**  | JWT, GitHub OAuth                               |
| **Deployment**      | Netlify (Frontend), Render (Backend)            |

## 📸 Screenshots

| Dashboard | Visualizer 1 | Visualizer 2 |
|-----------|--------------|--------------|
| ![Dashboard](https://github.com/user-attachments/assets/8a21c022-80aa-40c5-b472-0364727f5b4e) | ![Visualizer_Preview1](https://github.com/user-attachments/assets/e74b96ba-50a9-40c8-9125-1ac84823bed6) | ![Visualizer_Preview2](https://github.com/user-attachments/assets/85079816-06f8-4e51-9336-151765a8e3be) |

| AI Coach 1 | AI Coach 2 | Sync Panel |
|------------|------------|------------|
| ![AI Coach_Preview1](https://github.com/user-attachments/assets/61e0af52-c853-4329-8bfb-cb56cc6869d1) | ![AI_Coach_Preview2](https://github.com/user-attachments/assets/e636073a-e640-4f67-9fe6-2b7593dfe174) | ![Sync Panel](https://github.com/user-attachments/assets/4fc54b08-634b-4e2d-b37a-cd84a978377b) |

| Practice Tracker 1 | Practice Tracker 2 | Settings | Version Control |
|--------------------|--------------------|----------|-----------------|
| ![Practice Tracker](https://github.com/user-attachments/assets/d02a0a1d-c3bc-4378-a65b-b17729238bdb) | ![Practice Tracker 2](https://github.com/user-attachments/assets/6e65342f-083f-4655-aeaa-c1cc5111bc55) | ![Settings](https://github.com/user-attachments/assets/2c45226c-01fa-4a07-837e-8d2c37aa6e65) | ![Version Control](https://github.com/user-attachments/assets/f6d0130e-e40b-43ff-9c98-e398bda3aeaa) |

## 🧰 Installation (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/algovista.git
cd algovista
```

### 2. Start Frontend

```bash
cd client
npm install
npm run dev  # Runs at http://localhost:5173
```

### 3. Start Backend

```bash
cd server
npm install
npx nodemon index.js  # Runs at http://localhost:5000
```

### 4. Environment Variables

**`/server/.env`**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback
```

**`/client/.env.local`**
```
VITE_BACKEND_URL=http://localhost:5000
```


## 📚 How It Works

- **DSA Visualizer**: D3.js and p5.js render interactive animations for algorithms like sorting, trees, and graphs.
- **Practice Tracker**: Aggregates LeetCode/Codeforces submissions and displays progress via heatmaps and stats.
- **AI Coach**: Analyzes user performance to suggest problems targeting weak areas.
- **Version Control**: Stores and timestamps code submissions for easy review.
- **Authentication**: JWT and GitHub OAuth provide secure user access.
- **Data Storage**: MongoDB Atlas manages user profiles, submissions, and progress.

## 📦 Deployment

### Frontend (Netlify)
- **Framework**: React + Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Backend (Render)
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `node index.js`

## 💡 Future Improvements

- 📈 **Competitive Analytics**: Rating graphs and rank prediction.
- 🎮 **Gamification**: XP, badges, and global leaderboards.
- 📂 **Public Profiles**: Shareable showcases for solutions and progress.
- 💬 **Community Features**: Peer discussions, challenges, and Q&A threads.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. 🍴 Fork the repository.
2. 🔧 Create a feature branch (`git checkout -b feature/your-feature`).
3. ✅ Commit your changes (`git commit -m "Add your feature"`).
4. 📬 Push to the branch (`git push origin feature/your-feature`).
5. 🔄 Open a Pull Request.

Report bugs or suggest features via GitHub Issues.

## 📄 License

MIT License © 2025 [Ayush Kumar]

## 🧑‍💻 Built by

[Ayush Kumar]

---

### ✅ Next Steps

1. Replace placeholders:
   - `yourusername` in the GitHub link.
   - `your_mongodb_connection_string`, `your_jwt_secret`, etc., in `.env` files.
   - Screenshot URLs with actual image links.
2. Add `.env` files for backend and frontend as needed.
3. Include badges for Netlify, Render, and MongoDB Atlas.
4. Update the live demo link with the actual deployment URL.
