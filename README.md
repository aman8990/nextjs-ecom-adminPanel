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

## 🧰 Tech Stack

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
