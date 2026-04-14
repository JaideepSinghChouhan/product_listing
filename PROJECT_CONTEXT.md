# 🧠 Project Context: Lead Generation CMS

## 🎯 Goal
Build a simple CMS for managing products and capturing leads.

---

## 🧱 Tech Stack
- Next.js (App Router)
- TypeScript
- Prisma + Supabase (DB)
- Cloudinary (images)
- JWT Auth (access + refresh)

---

## 📦 Modules
1. Auth (Admin only)
2. Categories
3. Products
4. Leads
5. CMS (Hero, Videos, Testimonials)
6. Dashboard

---

## 🗄️ Data Models (IMPORTANT)
- Product: title, description, images[], categoryId, isHidden
- Category: name, isHidden
- Lead: name, phone, message, status, notes

---

## 🔐 Rules / Constraints
- No slugs
- No tags
- Multiple images per product
- Hide/show instead of delete
- Admin-only system

---

## 🌐 API Design (VERY IMPORTANT)
- POST /api/auth/login
- POST /api/products
- GET /api/products
- PATCH /api/products/:id
- POST /api/leads

---

## ⚠️ Current State
- Project initialized
- Prisma not yet finalized
- Auth not built

---

## ❗ Known Issues
- None yet