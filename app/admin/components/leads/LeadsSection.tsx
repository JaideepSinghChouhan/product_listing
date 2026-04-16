"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import LeadsTable from "./LeadsTable";

export default function LeadsSection() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    const data = await api("/leads/admin");
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-playfair text-xl">Leads</h2>

      <LeadsTable leads={leads} refresh={fetchLeads} />
    </div>
  );
}    