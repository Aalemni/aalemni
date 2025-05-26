"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { updateStatusAndSendEmail } from "@/supabase/actions/partners_action";

interface Partner {
  partnerid: string;
  organization_name: string | null;
  email: string | null;
  partnership_goal: string | null;
  status: number;
}

interface PartnersPageProps {
  initialPartners: Partner[];
}

const statusMap: Record<number, string> = {
  1: "pending",
  2: "rejected",
  3: "accepted",
};

const statusOptions = [
  { value: 1, label: "pending" },
  { value: 2, label: "rejected" },
  { value: 3, label: "accepted" },
];

export default function PartnersPage({ initialPartners }: PartnersPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredPartners = partners.filter((partner) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      (partner.organization_name?.toLowerCase().includes(query) ?? false) ||
      (partner.email?.toLowerCase().includes(query) ?? false) ||
      (partner.partnership_goal?.toLowerCase().includes(query) ?? false)
    );
  });

  const handleStatusChange = async (partnerid: string, newStatus: number) => {
    setLoadingId(partnerid);

    // Find partner to get email and organization name for email sending
    const partner = partners.find((p) => p.partnerid === partnerid);
    if (!partner) {
      alert("Partner not found");
      setLoadingId(null);
      return;
    }

    try {
      const result = await updateStatusAndSendEmail(
        partnerid,
        newStatus,
        partner.email || "",
        partner.organization_name || "Partner"
      );

      if (result.success) {
        setPartners((prev) =>
          prev.map((p) =>
            p.partnerid === partnerid ? { ...p, status: newStatus } : p
          )
        );
      } else {
      }
    } catch (error) {
      alert("Error updating status");
    }

    setLoadingId(null);
  };

  return (
    <Card className="container mx-auto p-4">
      <Input
        placeholder="Search partners..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Goal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Change Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPartners.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No partners found
              </TableCell>
            </TableRow>
          ) : (
            filteredPartners.map((partner) => {
              const statusText = statusMap[partner.status] || "Unknown";
              return (
                <TableRow key={partner.partnerid}>
                  <TableCell>{partner.organization_name || "-"}</TableCell>
                  <TableCell>{partner.email || "-"}</TableCell>
                  <TableCell>{partner.partnership_goal || "-"}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        statusText === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : statusText === "accepted"
                            ? "bg-green-100 text-green-800"
                            : statusText === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }
                    >
                      {statusText}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <select
                      disabled={loadingId === partner.partnerid}
                      value={partner.status}
                      onChange={(e) =>
                        handleStatusChange(
                          partner.partnerid,
                          Number(e.target.value)
                        )
                      }
                      className="border rounded px-2 py-1"
                    >
                      {statusOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
