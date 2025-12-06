# Bistro Bliss

Bistro Bliss is a professionally built full-stack restaurant platform designed to enhance a restaurant’s online presence.
It offers customers a polished interface to explore the menu, learn about the brand, reserve tables, and make inquiries, while providing staff with an efficient admin panel for managing content and operations.

## 🗂 Repository Structure

```
bistro-bliss/
├── angular-app/ # Frontend (Angular)
├── backend/ # Backend (API / server logic)
├── admin-panel/ # Admin panel interface
├── .gitignore
└── README.md # <- this file
```

## 🎯 Project Purpose

> The purpose of Bistro Bliss is to deliver a reliable digital solution that supports both customer engagement and internal workflow.
> The platform streamlines key restaurant functions—such as menu management, reservation handling, and content updates—enabling businesses to maintain a modern, user-friendly online experience with minimal effort.

## 🧰 Tech Stack

- Frontend: Angular, TypeScript, HTML, CSS, Tailwind
- Backend: Node.js, Express, Cors
- Admin Panel: Angular, TypeScript, HTML, CSS, Tailwind
- Other technologies / dependencies: MongoDB, Mongoose, JWT, bcryptjs

## 🚀 Setup & Run (Development)

### Prerequisites

To run Bistro Bliss locally, make sure you have the following installed:

- **Node.js** and **npm**
- **Angular CLI** (for frontend and admin panel)
- **MongoDB** (local or cloud instance)

### Environment Variables

Create a `dev.env` file in the `backend` directory with the following:

- PORT
- JWT_SECRET
- MONGODB_URI
- ADMIN_NAME
- ADMIN_EMAIL
- ADMIN_PASSWORD

### Running the Application

#### Backend

```bash
cd backend
npm install
ng serve
node --watch --env-file=./dev.env src/index.js
```

> `--watch` flag allows simple auto reloading whenever you make a change in the js files in the backend

### Frontend (Angular)

```bash
cd angular-app
npm install
ng serve
```

This should serve the frontend, typically at http://localhost:4200.

### Admin Panel (Angular)

> Repeat the same steps in the admin-panel folder:

```
cd admin-panel
npm install
ng serve
```

The admin panel will typically run at http://localhost:4201.

## ✅ Features

### Customer Features

- Browse the restaurant menu with descriptions, images, and prices.
- Make table reservations online with date, time, and party size.
- Contact the restaurant via an email link.
- Responsive design for seamless use on mobile, tablet, and desktop.

### Admin Panel Features

- Add, edit, or remove menu items.

### Authentication & Security

- Admin authentication to secure access to management features.
- Environment variables to safely store sensitive information (e.g., DB URI, ports).

### Backend

- RESTful API endpoints for CRUD operations on menu items, bookings, and users
- MongoDB database integration via Node.js + Express (cloud-based)

## 🛠 Future Work

- **Core Features:**
  - User registration and login for customers (optional for guests).
  - View basic analytics (e.g., number of reservations, popular menu items).
  - Update restaurant information and announcements.
  - Manage table bookings and reservation statuses.
- **Payment Integration:** Allow customers to pre-pay or secure deposits online.
- **Order History & Tracking:** Let customers view past reservations or orders.
- **Advanced Analytics:** Provide insights for admins, like peak hours or popular menu items
- **Notification System:** Email or SMS confirmations for bookings
- **Multi-language Support:** Make the website accessible to non-English speaking users
- **Enhanced UI/UX:** Add animations, filtering, and sorting options for menus
- **Automated Testing & CI/CD:** Add unit tests, integration tests, and deployment automation

## 🧑‍💻 Author / Maintainers

- **SHARKBAITHOOHAHA** — primary author / maintainer
- Feel free to fork, open issues, or submit pull requests

## 🙏 Acknowledgments

Special thanks to the original UI designer/owner for providing the visual foundation that inspired this project
