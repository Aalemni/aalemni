import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CommunityLoading() {
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

      {/* Features Skeleton */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-6 w-24 rounded-full" />
            <Skeleton className="mx-auto mt-4 h-10 w-3/4" />
            <Skeleton className="mx-auto mt-4 h-6 w-2/3" />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="mt-4 h-6 w-40" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Group Chats Skeleton */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="mt-4 h-10 w-64" />
              <Skeleton className="mt-4 h-6 w-80" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="mt-12">
            <Skeleton className="h-10 w-full max-w-md rounded-lg" />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <Card key={i}>
                    <Skeleton className="aspect-video w-full" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="mt-2 h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-16 w-full" />
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

