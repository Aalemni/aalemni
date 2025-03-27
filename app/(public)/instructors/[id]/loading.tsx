import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function InstructorProfileLoading() {
  return (
    <>
      {/* Cover Image Skeleton */}
      <Skeleton className="h-48 w-full md:h-64 lg:h-80" />

      {/* Instructor Profile Header Skeleton */}
      <section className="container relative -mt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <Skeleton className="h-40 w-40 rounded-full" />
              <Skeleton className="mt-4 h-8 w-48" />
              <Skeleton className="mt-2 h-4 w-32" />

              <Skeleton className="mt-4 h-4 w-24" />

              <div className="mt-6 grid w-full grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              <Skeleton className="mt-6 h-40 w-full rounded-lg" />

              <div className="mt-6 w-full">
                <Skeleton className="h-6 w-24" />
                <div className="mt-2 flex flex-wrap gap-2">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                </div>
              </div>

              <div className="mt-6 w-full">
                <Skeleton className="h-6 w-24" />
                <div className="mt-2 space-y-2">
                  {Array(2)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-12 rounded-full" />
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-6 w-full">
                <Skeleton className="h-6 w-24" />
                <div className="mt-2 space-y-3">
                  {Array(2)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="mt-1 h-4 w-32" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="w-full">
              <div className="flex">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-10 w-1/4" />
                  ))}
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-48 w-full rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Instructors Skeleton */}
      <section className="py-16 bg-muted">
        <div className="container">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="mt-2 h-4 w-1/2" />
                    <Skeleton className="mt-2 h-4 w-1/3" />
                    <div className="mt-3 flex flex-wrap gap-1">
                      {Array(3)
                        .fill(null)
                        .map((_, j) => (
                          <Skeleton key={j} className="h-6 w-16 rounded-full" />
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}

