# 🛒 Next.js E-Commerce Dashboard

A modern and secure admin dashboard for managing an e-commerce platform, built using **Next.js 15**, **Prisma**, **NextAuth**, and **Tailwind CSS**.


## 🚀 Live Demo

**🔗 [Live Site](https://nextjs-ecom-admin-panel.vercel.app)**

🛠 **Note:**
- This is the admin panel for the project **nextjs-ecom**  
  → [E-com Repo](https://github.com/aman8990/nextjs-ecom)  
  → [E-com Live Site](https://nextjs-ecom-ochre.vercel.app)
- Only users with **admin privileges** can log in using **credentials + OTP**.

---

## ✨ Features

- 🔐 Secure authentication with **NextAuth.js**
- 🔐 Secure admin login using otp
- 📦 Product, order & users management
- 📈 Dashboard with new orders and other info
- 📧 Email integration using **Nodemailer**
- 📄 Invoice PDF generation with **pdfmake**
- 📅 Date utilities with **date-fns**
- 🌐 API data fetching with **Axios** & **SWR**
- 🧙‍♂️ Form management with **React Hook Form**
- 💅 Styled with **Tailwind CSS**
- ⚡ Toast notifications with **React Hot Toast**

---

## 🛠️ Tech Stack

### Frontend:
- **Next.js 15 (App Router)**
- **React 19**
- **Tailwind CSS**
- **SWR (Stale-While-Revalidate)**

### Backend:
- **Next.js API Routes**
- **Prisma ORM with Mongodb**

### Auth & Access Control:
- **NextAuth.js**
- **Credentials + OTP-based login for Admins**
- **@next-auth/prisma-adapter** – Session & user sync with DB

### Tools & Utilities:
- **Axios** – API requests
- **Bcrypt** – Password hashing
- **Date-fns** – Date utilities
- **Nodemailer** – Email service
- **pdfmake** – PDF invoice generation
- **React Hook Form** – Form management
- **React Icons** – Icon library
- **React Hot Toast** – Notifications

---

## 📂 Project Structure

```bash
project/
  ├── middleware.js          # Middleware for route protection (auth guard)
  ├── prisma/
  │   └── schema.prisma      # Prisma schema for MongoDB

  app/
    ├── api/                 # API endpoints (auth, orders, etc.)
    ├── _actions/            # Next.js Server Actions (e.g. current user, session)
    ├── _context/            # React Contexts (e.g., Auth context, Toast context)
    ├── _components/         # Reusable UI components (buttons, input etc.)
    ├── _hooks/              # Custom hooks (useNewOrders, useAllProducts etc.)
    ├── _libs/               # Core libraries (prismadb, emailSender, fetcher etc.)
    ├── (site)/              # User login page
    ├── admin/               # Admin dashboard routes
    │   └── dashboard/       # Main admin dashboard view
    │   └── newOrders/       # Page to review new orders
    │   └── updateProduct/   # Product update form
    │   └── orderDetails/    # Detailed order view
    │   ||                   # More Routes
    │
    ├── layout.js            # Root layout for the app
    ├── globals.css          # Global Tailwind styles
    └── not-found.js         # Custom 404 error page
```

---

# 🧪 Getting Started

Follow these steps to set up the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/nextjs-ecom-dashboard.git
cd nextjs-ecom-dashboard
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Set Up Environment Variables

```bash
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

EMAIL_USERNAME=your_name@service.com
EMAIL_PASSWORD=your_password
EMAIL_FROM=your_email@gmail.com

```

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Start Development Server

```bash
npm run dev
```

---

## 📬 Contact

Created by [Aman Kumar](https://github.com/aman8990)  
📧 Email: [amandalal899@gmail.com](mailto:amandalal899@gmail.com)
