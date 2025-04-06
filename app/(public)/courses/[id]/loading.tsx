import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Course Header Skeleton */}
      <div className="relative bg-aalemni-navy text-white">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>

              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-6" />

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24 mt-1" />
                  </div>
                </div>

                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-40" />
              </div>
            </div>

            <div className="md:col-span-1">
              <Card className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>

                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>

                  <div className="mt-6 space-y-4">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <div key={i} className="flex justify-between">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      ))}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="space-y-3">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 flex-1" />
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Skeleton */}
      <div className="container py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <Skeleton className="h-8 w-48 mb-4" />
                  <div className="space-y-4">
                    {Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                  </div>
                </div>

                <div>
                  <Skeleton className="h-8 w-48 mb-4" />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {Array(6)
                      .fill(null)
                      .map((_, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
                          <Skeleton className="h-5 flex-1" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-3">
                    {Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
                          <Skeleton className="h-5 flex-1" />
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <Skeleton className="h-6 w-40 mb-4" />
                  <div className="space-y-3">
                    {Array(3)
                      .fill(null)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-md" />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
