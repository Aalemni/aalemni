import { Skeleton } from "@/components/ui/skeleton"

export default function PartnersLoading() {
  return (
    <div className="space-y-16">
      {/* Hero Section Skeleton */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="mt-4 h-12 w-3/4" />
              <Skeleton className="mt-6 h-6 w-full" />
              <Skeleton className="mt-2 h-6 w-5/6" />
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Skeleton className="h-12 w-full sm:w-40" />
                <Skeleton className="h-12 w-full sm:w-40" />
              </div>
            </div>
            <div className="relative flex items-center justify-center lg:justify-end">
              <Skeleton className="aspect-video w-full max-w-lg rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types Skeleton */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-6 w-24 rounded-full" />
            <Skeleton className="mx-auto mt-4 h-10 w-3/4" />
            <Skeleton className="mx-auto mt-4 h-6 w-2/3" />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-lg" />
              ))}
          </div>
        </div>
      </section>

      {/* Current Partners Skeleton */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-6 w-24 rounded-full" />
            <Skeleton className="mx-auto mt-4 h-10 w-3/4" />
            <Skeleton className="mx-auto mt-4 h-6 w-2/3" />
          </div>

          <div className="mt-16">
            <Skeleton className="mx-auto h-10 w-full max-w-lg rounded-lg" />
            <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array(12)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="mt-4 h-4 w-24" />
                    <Skeleton className="mt-2 h-3 w-16" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

