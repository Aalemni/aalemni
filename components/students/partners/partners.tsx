"use client";

import { useState } from "react";
import { updateStatusAndSendEmail } from "@/supabase/actions/partners_action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Partner {
  partnerid: string;
  organization_name: string | null;
  email: string | null;
  partnership_goal: string | null;
  status: number;
}

const statusMap: Record<number, string> = {
  1: "Pending",
  2: "Rejected",
  3: "Accepted",
};

const statusOptions = [
  { value: 1, label: "Pending" },
  { value: 2, label: "Rejected" },
  { value: 3, label: "Accepted" },
];

export default function InstructorPartners({
  initialPartners,
}: {
  initialPartners: Partner[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredPartners = partners.filter((partner) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      partner.organization_name?.toLowerCase().includes(query) ||
      partner.email?.toLowerCase().includes(query) ||
      partner.partnership_goal?.toLowerCase().includes(query);

    const matchesFilter =
      statusFilter === "all" || String(partner.status) === statusFilter;

    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = async (partnerid: string, newStatus: number) => {
    setLoadingId(partnerid);
    const partner = partners.find((p) => p.partnerid === partnerid);
    if (!partner) return;

    const res = await updateStatusAndSendEmail(
      partnerid,
      newStatus,
      partner.email || "",
      partner.organization_name || "Partner"
    );

    if (res.success) {
      setPartners((prev) =>
        prev.map((p) =>
          p.partnerid === partnerid ? { ...p, status: newStatus } : p
        )
      );
    }

    setLoadingId(null);
  };

  const getOriginalStatus = (partnerid: string) =>
    initialPartners.find((p) => p.partnerid === partnerid)?.status;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Partners</h1>
          <p className="text-gray-500">Search, filter, and update statuses</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6 flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Search partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="1">Pending</SelectItem>
              <SelectItem value="2">Rejected</SelectItem>
              <SelectItem value="3">Accepted</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Partners Table */}
      <Card>
        <CardHeader>
          <CardTitle>Partners</CardTitle>
          <CardDescription>
            Showing {filteredPartners.length} result
            {filteredPartners.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="px-4 py-2">Organization</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Goal</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.map((partner) => (
                  <tr key={partner.partnerid} className="border-t">
                    <td className="px-4 py-3">
                      {partner.organization_name || "-"}
                    </td>
                    <td className="px-4 py-3">{partner.email || "-"}</td>
                    <td className="px-4 py-3">
                      {partner.partnership_goal || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          partner.status === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : partner.status === 3
                              ? "bg-green-100 text-green-800"
                              : partner.status === 2
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {statusMap[partner.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Select
                          value={String(partner.status)}
                          onValueChange={(val) =>
                            setPartners((prev) =>
                              prev.map((p) =>
                                p.partnerid === partner.partnerid
                                  ? { ...p, status: Number(val) }
                                  : p
                              )
                            )
                          }
                          disabled={loadingId === partner.partnerid}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={String(option.value)}
                                className="hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white data-[state=checked]:bg-gray-200 dark:data-[state=checked]:bg-gray-800"
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {getOriginalStatus(partner.partnerid) !==
                          partner.status && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleStatusChange(
                                partner.partnerid,
                                partner.status
                              )
                            }
                            disabled={loadingId === partner.partnerid}
                          >
                            Confirm
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPartners.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No matching partners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
