import { Skeleton } from "@/components/ui/skeleton"

export default function BecomeInstructorLoading() {
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

      {/* Stats Section Skeleton */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="mt-2 h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section Skeleton */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-6 w-24 rounded-full" />
            <Skeleton className="mx-auto mt-4 h-10 w-3/4" />
            <Skeleton className="mx-auto mt-4 h-6 w-2/3" />
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <Skeleton className="mt-6 h-6 w-48" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-1 h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

