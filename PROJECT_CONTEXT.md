# 🧠 Project Context: Lead Generation CMS

## 🎯 Goal
Build a CMS-based product catalogue system with lead generation (no e-commerce).

---

## 🧱 Tech Stack
- Next.js (App Router)
- TypeScript
- Prisma + Supabase (PostgreSQL)
- Cloudinary (image storage)
- JWT (access only, 1 day expiry)
- bcrypt (password hashing)

---

## 📦 Modules

### ✅ Auth (COMPLETED)
- Admin login
- JWT access token (1 day)
- Token stored in localStorage
- Auth handled inside APIs (not middleware)

---

### ✅ Categories (COMPLETED)
- GET /api/categories → public (ACTIVE only)
- GET /api/categories/admin → all categories
- POST /api/categories → create (protected)
- PUT /api/categories/:id → update (protected)
- PATCH /api/categories/:id/toggle → hide/show (protected)

❌ No DELETE (using status instead)

---

### 🔜 Products (COMPLETED)
- CRUD operations
- Multiple image upload (Cloudinary)
- Category relation
- Hide/show support

---

### 🔜 Leads
- Capture via form
- Optional product reference
- Status: NEW, CONTACTED, QUOTED
- Notes support

---

### 🔜 CMS
- Hero section (single entry)
- Videos
- Testimonials

---

### 🔜 Dashboard
- Total products
- Total leads
- Monthly stats

---

## 🗄️ Database Design (FINALIZED)

### Category
- id
- name
- description
- imageUrl
- publicId
- status (ACTIVE | HIDDEN)

---

### Product
- id
- name
- description
- images (JSON)
- sku
- categoryId
- status (ACTIVE | HIDDEN)

---

### Lead
- id
- name
- contact
- message
- quantity
- productId (optional)
- status (NEW | CONTACTED | QUOTED)
- notes (JSON)

---

### Admin
- id
- email
- password (hashed)
- role
- lastLogin

---

## 🔐 Auth Rules
- Only admin routes require token
- Auth handled inside API routes
- Middleware NOT used for JWT verification

---

## ⚠️ Important Decisions

- No product tags
- No slugs
- Multiple images per product
- Soft delete using status (ACTIVE/HIDDEN)
- No DELETE APIs
- JWT not used in middleware (Edge limitation)
- Params must be awaited in Next.js App Router

---

## 🧠 Known Gotchas

- `params` is async → must use `await`
- Request body can be read only once
- JWT fails in middleware (Edge runtime)
- Use API-level auth instead

---

## 🔄 Current Progress

✅ Project setup complete  
✅ Prisma connected to Supabase  
✅ Auth system working  
✅ Categories module completed  

---

## 🔜 Next Step
👉 Build Products Module (with Cloudinary upload)