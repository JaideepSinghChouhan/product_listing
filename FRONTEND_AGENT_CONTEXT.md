# Frontend Agent Context (Product Listing)

## 1) Purpose
This file is a ready reference for any AI agent generating frontend code for this project.
Use it to build new UI components/pages that:
- Match existing visual style (fonts, spacing, color language)
- Correctly consume existing APIs
- Follow current project patterns (client components, fetch flow, auth token handling)

Primary objective: Generate production-usable frontend components with minimal rewrites.

---

## 2) Project Snapshot
- Framework: Next.js 16 (App Router)
- Language: TypeScript + React 19
- Styling: Tailwind CSS v4 + CSS variables in styles/global.css
- Backend: App Router API routes + Prisma
- Auth: JWT token from /api/admin/login, stored in localStorage as token
- Image source: Cloudinary

Important runtime conventions:
- Interactive UI components are client components ("use client")
- Protected API calls use Authorization: Bearer <token>
- Most UI data fetching is useEffect + useState based

---

## 3) Typography + Styling Contract

### Fonts
- Body font: Inter via --font-inter
- Display/heading font: Playfair Display via --font-playfair

Use these classes:
- Heading: font-playfair
- Body/default: font-sans (already wired globally)

### Core design tokens (from styles/global.css)
- Background: --background (#fff)
- Surface: --surface (#fff), --surface-elevated (#f9f9f9)
- Text: --foreground (#000), --foreground-muted (#666)
- Accent/primary: --accent and --primary are black (#000)
- Border: --border rgba(0,0,0,0.08)
- Radius base: --radius = 0.75rem

### Utility style patterns already used
- Primary button: bg-accent text-white rounded-lg or rounded-full
- Inputs: border rounded-lg bg-surface text-sm
- Card: border rounded-xl bg-white
- Hover: hover:shadow-lg, hover:bg-accent/5 or /10
- Active press: active:scale-95
- Section spacing: py-10 to py-20, responsive with sm/md modifiers

### Responsive conventions
- Common content container: max-w-7xl mx-auto px-4 md:px-12
- Product grids: grid-cols-2 md:grid-cols-4
- Mobile-first class order is used consistently

---

## 4) API Contract Map (Frontend-facing)

## Auth
### POST /api/admin/login
Body:
- email: string
- password: string

Success response:
- token: string
- admin: { id: string, email: string }

Failure:
- 401 invalid credentials

Frontend note:
- Save token in localStorage with key token

---

## Categories
### GET /api/categories
- Public
- Returns ACTIVE categories only

### GET /api/categories/admin
- Protected
- Returns all categories

### POST /api/categories
- Protected
Body:
- name: string
- description?: string
- image: base64 string

### PUT /api/categories/:id
- Protected
- Partial update supported

### PATCH /api/categories/:id/toggle
- Protected
- Toggles ACTIVE/HIDDEN

### DELETE /api/categories/:id
- Protected
- Hard delete (not soft-delete)

---

## Products
### GET /api/products
- Public
Query params:
- page (default 1)
- limit (default 10)
- search
- categoryId

Response shape:
- { data: Product[], pagination: { total, page, limit, totalPages } }

### GET /api/products/admin
- Protected
- Returns full list with category relation

### POST /api/products
- Protected
Body:
- name: string
- description: string
- categoryId: string
- images: base64[]
- sku: string (required, unique)
- moq?: number
- customization?: string

### GET /api/products/:id
- Public

### PUT /api/products/:id
- Protected
- Partial update supported

### PATCH /api/products/:id/toggle
- Protected
- Toggles ACTIVE/HIDDEN

### DELETE /api/products/:id
- Currently not protected in route code
- Treat as sensitive operation from UI side anyway

---

## Leads
### POST /api/leads
- Public
Body commonly used:
- name: string (required)
- contact: string (required)
- email?: string
- companyName?: string
- message?: string
- requirement?: string
- quantity?: number
- productId?: string
- utmSource?: string
- utmMedium?: string
- utmCampaign?: string

Validation:
- name min length 2
- contact min length 8
- optional valid email format

### GET /api/leads/admin
- Protected
- Returns leads with product relation

### PATCH /api/leads/:id
- Protected
Body:
- status?: "NEW" | "CONTACTED" | "QUOTED"
- note?: string

Behavior:
- note gets appended to notes[] JSON

---

## Hero
### GET /api/hero
- Public

### POST /api/hero
- Protected
Body:
- heading?: string
- subtext?: string
- image: base64 string (required)

### DELETE /api/hero/:id
- Protected

---

## Videos
### GET /api/videos
- Public

### POST /api/videos
- Protected
Body: { title, url }

### DELETE /api/videos/:id
- Protected

---

## Testimonials
### GET /api/testimonials
- Public

### POST /api/testimonials
- Protected
Body: { name, role?, company?, message }

### DELETE /api/testimonials/:id
- Protected

---

## Clients
### GET /api/clients
- Public

### POST /api/clients
- Protected
Body:
- name: string
- image: base64 string

### DELETE /api/clients/:id
- Protected

---

## Contact
### GET /api/contact
- Public
- Returns first (singleton-like) contact record

### POST /api/contact
- Protected
Body:
- address
- phone
- email
- mapUrl

Behavior:
- create if none exists, else update first record

---

## Dashboard
### GET /api/dashboard
- Protected
Response:
- totalProducts
- totalCategories
- totalLeads
- recentLeads (latest 5)

---

## 5) Frontend Integration Rules for Agents

1. For protected routes, prefer lib/api.ts helper (it auto-adds token header).
2. For public routes, direct fetch("/api/... ") is acceptable.
3. Always handle API shape variance where needed:
   - Products public endpoint returns object with data[]
   - Several other endpoints return array directly
4. Use loading, empty, and error states in every data-driven component.
5. Keep generated components in the same architecture style:
   - public: app/components/home or app/components
   - admin: app/admin/components/<feature>
6. Reuse existing visual grammar:
   - rounded-xl cards, rounded-full pills/CTAs, thin borders, black-accent actions
7. Use Playfair for prominent titles and Inter for body copy.
8. Keep code client-side unless there is a clear server component need.

---

## 6) Reusable Type Hints
Use these lightweight frontend types as defaults when generating components.

```ts
export type Status = "ACTIVE" | "HIDDEN";
export type LeadStatus = "NEW" | "CONTACTED" | "QUOTED";

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  publicId?: string | null;
  status: Status;
  createdAt: string;
}

export interface ProductImage {
  url: string;
  publicId?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  customization?: string | null;
  sku: string;
  moq?: number | null;
  images: ProductImage[];
  categoryId: string;
  category?: Category;
  status: Status;
  createdAt: string;
}

export interface LeadNote {
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  contact: string;
  email?: string | null;
  companyName?: string | null;
  message?: string | null;
  requirement?: string | null;
  quantity?: number | null;
  productId?: string | null;
  product?: Product | null;
  status: LeadStatus;
  notes?: LeadNote[] | null;
  createdAt: string;
}
```

---

## 7) Known Caveats Agents Must Respect
- Dynamic route params are async in this codebase pattern; route handlers often await params.
- Product details page currently fetches related products with wrong query key in existing code. Correct key should be categoryId, not id.
- /api/products/:id DELETE route is not auth-guarded in backend right now; avoid exposing destructive public UI actions.
- API error responses are not fully uniform. Always code defensive checks for error/details.
- next.config.ts currently uses images.domains for Cloudinary host.

---

## 8) Prompt Template You Can Reuse with Any Agent
Copy this block when asking another agent to generate frontend code:

"""
Use FRONTEND_AGENT_CONTEXT.md as the source of truth.
Goal: Build [COMPONENT/PAGE NAME].
Location: [TARGET FILE PATH].
Data source: [API ENDPOINTS].
Interaction requirements: [Create/Edit/Delete/Filter/Pagination/etc].
Reference style snippet (must emulate spacing, fonts, and visual tone):
[PASTE YOUR REFERENCE CODE HERE]

Hard requirements:
- Match existing typography (Playfair headings, Inter body)
- Use existing Tailwind token style (bg-background, text-foreground, bg-accent, etc.)
- Follow current data-fetching/auth patterns from context
- Include loading + empty + error states
- Return complete runnable TSX code
"""

---

## 9) Recommended File Placement for New UI
- Public section components: app/components/home/
- Shared public cards/widgets: app/components/
- Admin feature modules: app/admin/components/<feature>/
- If introducing shared types for many components: lib/types.ts (optional)

---

## 10) Definition of Done for Generated Components
A generated component is acceptable only if:
- It compiles in this Next.js project
- It uses the correct endpoint and response shape
- It follows current styling language and font usage
- It handles loading/empty/error states
- It does not introduce a new UI library unless explicitly requested
- It does not break existing route/auth conventions
