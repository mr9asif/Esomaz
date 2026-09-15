# eSomaz

<p align="center">
  <strong>A modern social networking platform to connect, share, and communicate.</strong>
</p>

<p align="center">
  <a href="https://esomaz.vercel.app/">🌐 Live</a>
</p>

---

## 📖 About

**eSomaz** is a full-stack social networking platform where users can share their thoughts, upload images, interact with posts, connect with other people, and communicate through real-time chat.

The goal of eSomaz is to provide a complete social media experience with a clean and interactive interface while demonstrating modern full-stack web development concepts.

🌐 **Live Website:** https://esomaz.vercel.app/

---

## ✨ Features

### 👤 User

- User registration and authentication
- User profile
- Profile image
- Edit profile information
- View other users' profiles
- Follow users
- Unfollow users
- Followers and following system

### 📝 Posts

Users can express themselves and share content with the community.

- Create posts
- Share thoughts
- Upload images
- View posts
- Edit posts
- Delete posts
- View individual posts

### ❤️ Social Interaction

- Like posts
- Unlike posts
- Comment on posts
- View comments
- Follow other users
- Unfollow users
- Interact with other users' content

### 💬 Real-Time Chat

eSomaz provides real-time communication between users.

- One-to-one messaging
- Real-time message delivery
- Conversation system
- Message history
- Online/offline status
- Real-time communication using WebSockets

### 🔎 User Discovery

- Discover other users
- Search/find users
- Visit user profiles
- Follow people
- Build your own social network

---

## 🛠️ Technologies

### Frontend

- React.js
- TypeScript
- Tailwind CSS
- React Router
- Axios
- TanStack Query
- Socket.IO Client

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO

### Other Technologies

- Cloudinary
- REST API
- WebSocket
- Git & GitHub
- Vercel

---

## 🏗️ Application Architecture

```text
                    ┌──────────────────────┐
                    │      eSomaz Web      │
                    │ React + TypeScript   │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │     Backend API       │
                    │ Node.js + Express     │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
       │   MongoDB    │ │  Cloudinary  │ │  Socket.IO   │
       │   Database   │ │    Images    │ │  Real-Time   │
       └──────────────┘ └──────────────┘ └──────┬───────┘
                                                │
                                                ▼
                                         Real-Time Chat
```
