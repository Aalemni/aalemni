"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BookOpen,
  Calendar,
  BadgeIcon as Certificate,
  CreditCard,
  FileText,
  GraduationCap,
  Heart,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Star,
  Users,
  BarChart,
  BookCheck,
  Building,
  Flag,
  LogOut,
  User,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type UserRole = "student" | "trainer" | "admin"

interface SidebarProps {
  userRole?: UserRole
  userName?: string
  userImage?: string
}

export function AalemniSidebar({ userRole = "student", userName = "John Doe", userImage }: SidebarProps) {
  const pathname = usePathname()

  // Navigation items based on user role
  const getNavItems = (role: UserRole) => {
    switch (role) {
      case "student":
        return [
          {
            title: "Dashboard",
            icon: Home,
            href: "/student/dashboard",
          },
          {
            title: "My Courses",
            icon: BookOpen,
            href: "/student/courses",
          },
          {
            title: "Wishlist",
            icon: Heart,
            href: "/student/wishlist",
          },
          {
            title: "Certificates",
            icon: Certificate,
            href: "/student/certificates",
          },
          {
            title: "Payments",
            icon: CreditCard,
            href: "/student/payments",
          },
          {
            title: "Settings",
            icon: Settings,
            href: "/student/settings",
          },
        ]
      case "trainer":
        return [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/trainer/dashboard",
          },
          {
            title: "My Courses",
            icon: BookOpen,
            href: "/trainer/courses",
          },
          {
            title: "Student Management",
            icon: Users,
            href: "/trainer/students",
          },
          {
            title: "Earnings",
            icon: CreditCard,
            href: "/trainer/earnings",
          },
          {
            title: "Reviews",
            icon: Star,
            href: "/trainer/reviews",
          },
          {
            title: "Settings",
            icon: Settings,
            href: "/trainer/settings",
          },
        ]
      case "admin":
        return [
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/admin/dashboard",
          },
          {
            title: "Manage Users",
            icon: Users,
            href: "/admin/users",
          },
          {
            title: "Manage Courses",
            icon: BookCheck,
            href: "/admin/courses",
          },
          {
            title: "Categories & Tags",
            icon: FileText,
            href: "/admin/categories",
          },
          {
            title: "Payments",
            icon: CreditCard,
            href: "/admin/payments",
          },
          {
            title: "Partnerships",
            icon: Building,
            href: "/admin/partnerships",
          },
          {
            title: "Community",
            icon: MessageSquare,
            href: "/admin/community",
          },
          {
            title: "Platform Settings",
            icon: Settings,
            href: "/admin/settings",
          },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems(userRole)

  // Get role display name
  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case "student":
        return "Student"
      case "trainer":
        return "Trainer"
      case "admin":
        return "Administrator"
      default:
        return ""
    }
  }

  return (
    <Sidebar variant="floating" className="border-r">
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center justify-center w-full">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Aalemni</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole === "student" && (
          <SidebarGroup>
            <SidebarGroupLabel>Community</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/community"} tooltip="Community">
                    <Link href="/community">
                      <MessageSquare className="h-4 w-4" />
                      <span>Community Forum</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/calendar"} tooltip="Calendar">
                    <Link href="/calendar">
                      <Calendar className="h-4 w-4" />
                      <span>Upcoming Sessions</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userRole === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Analytics</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin/analytics"} tooltip="Analytics">
                    <Link href="/admin/analytics">
                      <BarChart className="h-4 w-4" />
                      <span>Platform Analytics</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin/reports"} tooltip="Reports">
                    <Link href="/admin/reports">
                      <Flag className="h-4 w-4" />
                      <span>Reports & Issues</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={userImage} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{userName}</span>
                    <span className="text-xs text-muted-foreground">{getRoleDisplayName(userRole)}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/logout" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

