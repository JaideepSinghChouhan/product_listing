"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import LeadsTable from "./LeadsTable";
import { AdminListSkeleton } from "../../../components/skeletons";

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

  if (loading) return <AdminListSkeleton titleWidth={120} buttonWidth={0} rows={8} />;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-playfair text-xl">Leads</h2>

      <LeadsTable leads={leads} refresh={fetchLeads} />
    </div>
  );
}    