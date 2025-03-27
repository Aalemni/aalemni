import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function InstructorsLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-10 w-3/4" />
            <Skeleton className="mx-auto mt-4 h-6 w-2/3" />
            <div className="mt-8 flex items-center justify-center">
              <Skeleton className="h-10 w-full max-w-2xl rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Filters Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>

                <div className="mt-6 space-y-6">
                  {Array(4)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <div className="space-y-2">
                          {Array(5)
                            .fill(null)
                            .map((_, j) => (
                              <div key={j} className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-sm" />
                                <Skeleton className="h-4 w-24" />
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>

                <Skeleton className="mt-6 h-10 w-full" />
              </div>
            </div>

            {/* Instructor Listings Skeleton */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="mt-2 h-4 w-32" />
                </div>
                <div className="flex w-full items-center gap-4 sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                  <Skeleton className="h-10 w-full sm:w-[180px]" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array(9)
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
                        <div className="mt-4 flex items-center justify-between">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  {Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-8 w-8 rounded-md" />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

