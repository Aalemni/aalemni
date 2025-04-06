"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Clock,
  MapPin,
  Users,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for events
const events = [
  {
    id: 1,
    title: "Web Development Class",
    date: "2025-04-08T14:00:00",
    endTime: "2025-04-08T16:00:00",
    instructor: "Sarah Johnson",
    location: "online",
    type: "class",
  },
  {
    id: 2,
    title: "Digital Marketing Workshop",
    date: "2025-04-07T10:00:00",
    endTime: "2025-04-07T12:00:00",
    instructor: "Michael Chen",
    location: "Room 302, Building A",
    type: "workshop",
  },
  {
    id: 3,
    title: "Business Leadership Group Discussion",
    date: "2025-04-10T16:00:00",
    endTime: "2025-04-10T17:30:00",
    instructor: "Hadi Rahhal",
    location: "online",
    type: "discussion",
  },
  {
    id: 4,
    title: "Python Programming Lab",
    date: "2025-04-15T13:00:00",
    endTime: "2025-04-15T15:00:00",
    instructor: "Alex Rodriguez",
    location: "Computer Lab 101",
    type: "lab",
  },
  {
    id: 5,
    title: "UX/UI Design Critique Session",
    date: "2025-04-20T11:00:00",
    endTime: "2025-04-20T12:30:00",
    instructor: "Emma Wilson",
    location: "online",
    type: "critique",
  },
];

// Event type badge component
const EventTypeBadge = ({ type }: { type: string }) => {
  switch (type) {
    case "class":
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          Class
        </Badge>
      );
    case "workshop":
      return (
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          Workshop
        </Badge>
      );
    case "discussion":
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Discussion
        </Badge>
      );
    case "lab":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          Lab
        </Badge>
      );
    case "critique":
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          Critique
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
          Other
        </Badge>
      );
  }
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");

  // Get days in current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get events for selected date
  const selectedDateEvents = events.filter((event) =>
    isSameDay(parseISO(event.date), selectedDate)
  );

  // Get all events for current month
  const currentMonthEvents = events.filter((event) =>
    isSameMonth(parseISO(event.date), currentMonth)
  );

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Format time
  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), "h:mm a");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and upcoming events
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="day">Day View</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>
            Today
          </Button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          {format(currentMonth, "MMMM yyyy")}
        </h2>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-8">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}

        {Array.from({ length: monthStart.getDay() }).map((_, index) => (
          <div
            key={`empty-start-${index}`}
            className="h-24 border rounded-md bg-gray-50"
          ></div>
        ))}

        {monthDays.map((day) => {
          const dayEvents = events.filter((event) =>
            isSameDay(parseISO(event.date), day)
          );
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toString()}
              className={`h-24 border rounded-md p-1 overflow-hidden transition-colors cursor-pointer ${
                isSelected
                  ? "bg-primary/10 border-primary"
                  : isToday
                    ? "bg-blue-50 border-blue-200"
                    : ""
              }`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}
                >
                  {format(day, "d")}
                </span>
                {dayEvents.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {dayEvents.length}
                  </Badge>
                )}
              </div>

              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs truncate p-1 rounded bg-primary/10 border border-primary/20"
                  >
                    {formatTime(event.date)} {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-muted-foreground text-center">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {Array.from({ length: (7 - (monthEnd.getDay() + 1)) % 7 }).map(
          (_, index) => (
            <div
              key={`empty-end-${index}`}
              className="h-24 border rounded-md bg-gray-50"
            ></div>
          )
        )}
      </div>

      {/* Selected Day Events */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          Events for {format(selectedDate, "MMMM d, yyyy")}
        </h3>

        {selectedDateEvents.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                No events scheduled for this day
              </p>
              <Button variant="outline" className="mt-4">
                Add New Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {selectedDateEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h4 className="text-lg font-medium">{event.title}</h4>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {formatTime(event.date)} - {formatTime(event.endTime)}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" />
                        Instructor: {event.instructor}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        {event.location === "online" ? (
                          <>
                            <Video className="mr-1 h-4 w-4" />
                            Online Session
                          </>
                        ) : (
                          <>
                            <MapPin className="mr-1 h-4 w-4" />
                            {event.location}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                      <EventTypeBadge type={event.type} />
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" variant="outline">
                          Join
                        </Button>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {currentMonthEvents
            .filter((event) => new Date(event.date) >= new Date())
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .slice(0, 3)
            .map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(parseISO(event.date), "EEEE, MMMM d")} •{" "}
                        {formatTime(event.date)}
                      </p>
                    </div>
                    <EventTypeBadge type={event.type} />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
