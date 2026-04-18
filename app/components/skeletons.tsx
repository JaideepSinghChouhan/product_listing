"use client";

import Skeleton from "react-loading-skeleton";

export function HeroSectionSkeleton() {
  return (
    <section className="relative h-[72vh] sm:h-[80vh] md:h-[85vh] overflow-hidden">
      <Skeleton className="absolute inset-0 h-full" />
      <div className="relative z-10 w-full h-full px-5 sm:px-6 md:px-12 flex items-center">
        <div className="w-full max-w-xl">
          <Skeleton width={120} height={12} className="mb-4" />
          <Skeleton width="90%" height={52} className="mb-3" />
          <Skeleton width="75%" height={16} className="mb-8" />
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton width={140} height={44} borderRadius={999} />
            <Skeleton width={160} height={44} borderRadius={999} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeaderSkeleton() {
  return (
    <div className="text-center mb-8 sm:mb-10 px-4">
      <Skeleton width={220} height={34} className="mx-auto" />
      <Skeleton width={280} height={14} className="mx-auto mt-3" />
    </div>
  );
}

export function AboutSectionSkeleton() {
  return (
    <section className="py-16 sm:py-20 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-4">
          <Skeleton width={120} height={12} />
          <Skeleton width="90%" height={42} />
          <Skeleton width="80%" height={18} />
          <Skeleton width="75%" height={18} />
          <div className="flex gap-3 pt-4">
            <Skeleton width={140} height={44} borderRadius={999} />
            <Skeleton width={140} height={44} borderRadius={999} />
          </div>
        </div>

        <Skeleton className="aspect-[4/5] rounded-[2rem]" />
      </div>
    </section>
  );
}

export function CategoriesSkeleton() {
  return (
    <section className="py-10 sm:py-14 md:py-20">
      <div className="px-4 sm:px-6 md:px-12 mb-6 sm:mb-10 flex flex-col items-center">
        <Skeleton width={220} height={30} className="mb-2" />
        <Skeleton width={280} height={14} />
      </div>

      <div className="px-4 sm:px-6 md:px-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-28 sm:h-36 rounded-xl" />
        ))}
      </div>
    </section>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <section className="py-10 sm:py-14 md:py-20">
      <SectionHeaderSkeleton />

      <div className="px-4 sm:px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="border rounded-xl overflow-hidden">
            <Skeleton className="h-36 sm:h-48 md:h-52" />
            <div className="p-3">
              <Skeleton height={16} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-10 sm:mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <Skeleton width={140} height={24} className="mx-auto mb-4" />
          <Skeleton width="70%" height={40} className="mx-auto mb-3" />
          <Skeleton width="85%" height={14} className="mx-auto" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-4 sm:gap-6 overflow-hidden px-4 sm:px-6 md:px-12">
        {Array.from({ length: 2 }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex w-max py-1 gap-4">
            {Array.from({ length: 4 }).map((__, index) => (
              <div
                key={`${rowIndex}-${index}`}
                className="mx-2 sm:mx-3 w-[78vw] max-w-[280px] sm:w-[300px] md:w-[360px] flex-shrink-0 rounded-3xl border border-black/10 bg-white p-4 sm:p-5 md:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
              >
                <Skeleton width={56} height={18} className="mb-3" />
                <Skeleton width="90%" height={12} className="mb-2" />
                <Skeleton width="75%" height={12} className="mb-2" />
                <Skeleton width="85%" height={12} />

                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-black/5">
                  <Skeleton width={120} height={14} className="mb-2" />
                  <Skeleton width={160} height={10} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function VideoSectionSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <SectionHeaderSkeleton />

      <div className="px-4 sm:px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="rounded-[28px] aspect-[9/16]" />
        ))}
      </div>
    </section>
  );
}

export function ContactSectionSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-surface-elevated">
      <SectionHeaderSkeleton />

      <div className="grid md:grid-cols-2 gap-6 px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-[72px] rounded-xl" />
          ))}
        </div>

        <div className="border rounded-xl p-6 bg-background flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton height={46} borderRadius={10} />
            <Skeleton height={46} borderRadius={10} />
          </div>
          <Skeleton height={46} borderRadius={10} />
          <Skeleton height={46} borderRadius={10} />
          <Skeleton height={140} borderRadius={10} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton height={46} borderRadius={999} />
            <Skeleton height={46} borderRadius={999} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="border rounded-xl overflow-hidden">
          <Skeleton className="h-48" />
          <div className="p-3">
            <Skeleton height={16} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductsListingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 border-b" />

      <main>
        <section className="py-12 border-b">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <Skeleton width={200} height={36} className="mb-2" />
            <Skeleton width={260} height={14} />
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <div className="flex flex-col gap-4 mb-8">
              <Skeleton width="100%" height={48} className="max-w-md" />
              <Skeleton width="100%" height={48} className="max-w-lg" />
              <Skeleton width={180} height={42} />
            </div>

            <Skeleton width={220} height={14} className="mb-4" />
            <ProductGridSkeleton />
          </div>
        </section>

        <section className="py-10 border-t">
          <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
            <Skeleton width={220} height={28} />
            <Skeleton width={140} height={44} borderRadius={999} />
          </div>
        </section>
      </main>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="border rounded-2xl p-6">
            <Skeleton width={96} height={14} className="mb-3" />
            <Skeleton width={72} height={32} className="mb-4" />
            <Skeleton width="70%" height={12} />
          </div>
        ))}
      </div>

      <div className="border rounded-2xl p-6">
        <Skeleton width={180} height={24} className="mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-14 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 border-b" />
      <main className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <Skeleton className="aspect-square rounded-xl" />
            <div className="flex gap-2 mt-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} width={64} height={64} borderRadius={8} />
              ))}
            </div>
          </div>

          <div>
            <Skeleton width={120} height={12} className="mb-3" />
            <Skeleton width="70%" height={42} className="mb-3" />
            <Skeleton width={180} height={12} className="mb-4" />
            <Skeleton count={3} className="mb-2" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
              <Skeleton height={46} borderRadius={999} />
              <Skeleton height={46} borderRadius={999} />
              <Skeleton height={46} borderRadius={999} />
            </div>

            <div className="border rounded-xl p-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} height={16} className="mb-3 last:mb-0" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function AdminListSkeleton({ titleWidth = 180, buttonWidth = 160, rows = 6 }: { titleWidth?: number; buttonWidth?: number; rows?: number }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
        <Skeleton width={titleWidth} height={28} />
        <Skeleton className="w-full sm:w-[160px] h-10 rounded" />
      </div>
      <div className="border rounded-xl overflow-hidden">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className="h-12 border-b last:border-b-0" />
        ))}
      </div>
    </div>
  );
}