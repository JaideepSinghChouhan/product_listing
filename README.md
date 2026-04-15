This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## PROJECT STRUCTURE
project-root/
│
├── app/
│   ├── api/
│   │
│   │   ├── admin/
│   │   │   ├── login/route.ts        ✅ DONE
│   │   │   └── refresh/route.ts      ⚠️ (optional / future)
│   │   │
│   │   ├── products/                 ✅ DONE
│   │   │   ├── route.ts              (GET: search + pagination, POST)
│   │   │   ├── admin/
│   │   │   │   └── route.ts          (GET all incl. hidden)
│   │   │   ├── [id]/
│   │   │   │   └── route.ts          (PUT update)
│   │   │   └── [id]/toggle/
│   │   │       └── route.ts          (PATCH hide/show)
│   │   │
│   │   ├── categories/               ✅ DONE
│   │   │   ├── route.ts              (GET public, POST)
│   │   │   ├── admin/
│   │   │   │   └── route.ts          (GET all incl. hidden)
│   │   │   └── [id]/
│   │   │       ├── route.ts          (PUT update)
│   │   │       └── toggle/
│   │   │           └── route.ts      (PATCH hide/show)
│   │   │
│   │   ├── leads/                    ✅ DONE (CRM)
│   │   │   ├── route.ts              (POST public + email trigger)
│   │   │   ├── admin/
│   │   │   │   └── route.ts          (GET all leads)
│   │   │   └── [id]/
│   │   │       └── route.ts          (PATCH status + notes)
│   │   │
│   │   ├── dashboard/                ✅ DONE
│   │   │   └── route.ts              (stats + recent leads)
│   │   │
│   │   ├── hero/                     ✅ DONE (CMS)
│   │   │   └── route.ts              (GET, POST)
│   │   │
│   │   ├── videos/                   ✅ DONE (CMS)
│   │   │   ├── route.ts              (GET, POST)
│   │   │   └── [id]/
│   │   │       └── route.ts          (DELETE)
│   │   │
│   │   ├── testimonials/             ✅ DONE (CMS)
│   │   │   ├── route.ts              (GET, POST)
│   │   │   └── [id]/
│   │   │       └── route.ts          (DELETE)
│   │   │
│   │   ├── clients/                  ✅ DONE
│   │   │   ├── route.ts              (GET, POST)
│   │   │   └── [id]/
│   │   │       └── route.ts          (DELETE)
│   │   │
│   │   └── contact/                  ✅ DONE
│   │       └── route.ts              (GET, POST)
│   │
│   ├── admin/                        🚧 (TO BUILD - Admin Panel UI)
│   ├── products/                     🚧 (TO BUILD - Public pages)
│   ├── page.tsx                      🚧 (Homepage)
│
├── lib/
│   ├── prisma.ts                     ✅ DONE
│   ├── cloudinary.ts                 ✅ DONE
│   ├── upload.ts                     ✅ DONE
│   ├── mail.ts                       ✅ DONE
│   │
│   ├── auth.ts                       ✅ DONE (JWT logic)
│   ├── authMiddleware.ts             ✅ DONE
│   │
│   ├── validators.ts                 ✅ NEW (Zod validation)
│   │
│   └── utils/                        ⚠️ optional helpers
│
├── prisma/
│   └── schema.prisma                 ✅ FINALIZED
│
├── middleware.ts                     ⚠️ (can simplify later)
│
├── types/                            ⚠️ optional (frontend types later)
│
├── PROJECT_CONTEXT.md                ✅ UPDATED
├── DECISIONS.md                      ✅ UPDATED
│
├── .env                              ✅ CONFIGURED
├── package.json