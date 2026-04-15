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
│   │   │   └── refresh/route.ts      ⚠️ (planned / partial)
│   │   │
│   │   ├── products/                 ✅ DONE
│   │   │   ├── route.ts              (GET, POST)
│   │   │   ├── [id]/
│   │   │   │   └── route.ts          (PUT)
│   │   │   └── toggle/
│   │   │       └── route.ts          (PATCH hide/show)
│   │   │
│   │   ├── categories/               ✅ DONE
│   │   │   ├── route.ts              (GET public, POST admin)
│   │   │   └── [id]/
│   │   │       └── route.ts          (PUT, toggle hide/show)
│   │   │
│   │   ├── leads/                    🚧 IN PROGRESS
│   │   │   ├── route.ts              (POST public)
│   │   │   ├── admin/
│   │   │   │   └── route.ts          (GET all leads)
│   │   │   └── [id]/
│   │   │       └── route.ts          (PATCH status + notes)
│   │   │
│   │   ├── dashboard/                ❌ NOT STARTED
│   │   │   └── route.ts
│   │   │
│   │   ├── hero/                     ❌ NOT STARTED
│   │   │   └── route.ts
│   │   │
│   │   ├── videos/                   ❌ NOT STARTED
│   │   │   └── route.ts
│   │   │
│   │   └── testimonials/             ❌ NOT STARTED
│   │       └── route.ts
│   │
│   ├── admin/                        ⚠️ (UI later)
│   ├── products/                     ⚠️ (UI later)
│   ├── page.tsx                      ⚠️ (frontend later)
│
├── lib/
│   ├── prisma.ts                     ✅ DONE
│   ├── cloudinary.ts                 ✅ DONE
│   ├── auth.ts                       ✅ DONE (JWT)
│   ├── authMiddleware.ts             ✅ DONE (requireAuth)
│   │
│   └── utils/                        ⚠️ optional future
│
├── prisma/
│   └── schema.prisma                 ✅ UPDATED
│
├── middleware.ts                     ⚠️ PARTIAL (used but improving)
│
├── types/                            ⚠️ optional
│
├── PROJECT_CONTEXT.md                ✅ CREATED
├── DECISIONS.md                      ✅ CREATED
│
├── .env                              ✅ CONFIGURED
├── package.json