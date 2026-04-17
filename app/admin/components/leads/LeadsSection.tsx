"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { api } from "@/lib/api";
import LeadsTable from "./LeadsTable";

export default function LeadsSection() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const data = await api("/leads/admin");
      setLeads(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton width={100} height={28} />
        <div className="border rounded-xl overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-12 border-b last:border-b-0" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-playfair text-xl">Leads</h2>

      <LeadsTable leads={leads} refresh={fetchLeads} />
    </div>
  );
}    