

# AlgoVista – DSA Visualizer & Personalized Practice Tracker 🧠💻

[![Netlify Status](https://img.shields.io/badge/frontend-Netlify-brightgreen)](https://netlify.com)
[![Render Status](https://img.shields.io/badge/backend-Render-blue)](https://render.com)
[![MongoDB Atlas](https://img.shields.io/badge/database-MongoDB%20Atlas-green)](https://www.mongodb.com/atlas)
[![MIT License](https://img.shields.io/badge/license-MIT-lightgrey)](#license)

AlgoVista is a full-stack web application that empowers developers to **visualize DSA concepts**, track their coding practice across platforms like **LeetCode** and **Codeforces**, and receive **AI-powered recommendations** for consistent improvement.

---

## ✨ Preview

### 🧠 Personalized Dashboard
![Dashboard](<img width="944" height="418" alt="Image" src="https://github.com/user-attachments/assets/8a21c022-80aa-40c5-b472-0364727f5b4e" />)

### 📈 DSA Visualizer (Graphs, Sorting, Trees and more to be added)
![Visualizer](<img width="933" height="489" alt="Image" src="https://github.com/user-attachments/assets/e74b96ba-50a9-40c8-9125-1ac84823bed6" />)
[](<img width="914" height="482" alt="Image" src="https://github.com/user-attachments/assets/85079816-06f8-4e51-9336-151765a8e3be" />)

### 🤖 AI Coach & Sync Panel
![AI Coach_Preview1](<img width="932" height="477" alt="Image" src="https://github.com/user-attachments/assets/61e0af52-c853-4329-8bfb-cb56cc6869d1" />)
![AI_Coach_Preview2](<img width="910" height="242" alt="Image" src="https://github.com/user-attachments/assets/e636073a-e640-4f67-9fe6-2b7593dfe174" />)
![Sync Panel](<img width="929" height="475" alt="Image" src="https://github.com/user-attachments/assets/4fc54b08-634b-4e2d-b37a-cd84a978377b" />)

### Practice Tracker
![Practice Tracker](<img width="902" height="493" alt="Image" src="https://github.com/user-attachments/assets/d02a0a1d-c3bc-4378-a65b-b17729238bdb" />)
(<img width="916" height="489" alt="Image" src="https://github.com/user-attachments/assets/6e65342f-083f-4655-aeaa-c1cc5111bc55" />)

### Settings
![Settings](<img width="822" height="458" alt="Image" src="https://github.com/user-attachments/assets/2c45226c-01fa-4a07-837e-8d2c37aa6e65" />)

### Version Control
![Version Control](<img width="922" height="284" alt="Image" src="https://github.com/user-attachments/assets/f6d0130e-e40b-43ff-9c98-e398bda3aeaa" />)

---

## 🚀 Features

- 🔍 **DSA Visualizer** – Interactive animations (Sorting, Trees, Graphs) built with **D3.js** and **p5.js**
- 📊 **Personalized Practice Tracker** – Track daily solves, streaks, topic-wise progress
- 🌐 **LeetCode + Codeforces Sync** – Fetch submissions and stats using official APIs
- 🧠 **AI Coach** – Get problem recommendations based on your weak areas
- 🕓 **Version Control** – Review past solutions with timestamps
- 🔐 **Authentication** – Secure login with **JWT** and **GitHub OAuth**
- 📅 **Heatmap** – Track daily solve activity like GitHub commits

---

## 🛠️ Tech Stack

| Layer       | Technology                        |
|-------------|------------------------------------|
| Frontend    | React + Vite + TailwindCSS         |
| Visualizer  | D3.js + p5.js                      |
| Backend     | Node.js + Express.js               |
| Database    | MongoDB Atlas                      |
| Auth        | JWT + GitHub OAuth                 |
| Deployment  | Netlify (Frontend) + Render (API)  |

---

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/algovista.git
cd algovista

# Install dependencies
cd client && npm install
cd ../server && npm install

# Start development servers
cd client && npm run dev      # frontend at http://localhost:5173
cd ../server && npx nodemon index.js   # backend at http://localhost:5000
```

---

## 🛣️ Roadmap

### ✅ Completed
- LeetCode & Codeforces integration
- AI-powered coach module
- Version history for code submissions
- Heatmap + streak tracking
- Secure auth with JWT and GitHub

### 🚧 Coming Soon
- 📈 Competitive Analytics – Rating graphs, rank prediction
- 🎮 Gamification – XP, badges, and global leaderboards
- 📂 Public Projects – Shareable profiles with solution showcase
- 💬 Peer Discussions – Challenges, comments, and Q&A threads

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. 🍴 Fork the repo
2. 🔧 Create a feature branch
3. ✅ Commit changes
4. 📬 Open a Pull Request

---

## 📄 License

Licensed under the MIT License.
