# SecureSight Dashboard

A technical assessment project for **SecureSight**, a fictional CCTV monitoring software.  
The project implements a dashboard where users can monitor up to **3 CCTV feeds** and view detected incidents like unauthorized access and gun threats.

**Live Demo:** [SecureSight Dashboard](https://instinctive-studio-frontend-two.vercel.app)

---

## Features

### Mandatory Scope
- **Navbar** – Quick navigation across the dashboard.
- **Incident Player (Left Panel)** – Displays CCTV video feeds.
- **Incident List (Right Panel)** – Shows detected incidents with details such as type, timestamp, and severity.

### Optional Scope
- **Incident Timeline (Bottom Panel)** – Visual timeline for quick incident review.

---

## Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

### Backend
- **Server:** Node.js + Express
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Deployment:** Render

---

## Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **PostgreSQL** (running locally or hosted on Render)

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/Arindamsharma12/instinctive-studio.git
cd instinctive-studio
```
#### 2. Install Dependencies
```bash
cd client
npm install
```
#### 3. Clone the Repository
```bash
cd ../server
npm install
```

#### 4. Environment variables
``` bash
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>?schema=public"
PORT=5000
```
#### 5. Start command for both backend server and frontend
```bash
npm run dev
```
