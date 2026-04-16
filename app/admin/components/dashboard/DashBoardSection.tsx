"use client";

import { use, useEffect, useState } from "react";
import { Package, Inbox, TrendingUp } from "lucide-react";

import { api } from "@/lib/api";
import StatCard from "./StatCard";
import RecentLeads from "./RecentLeads";

export default function DashboardSection() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api("/dashboard");
      setData(res);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard label="Total Products" value={data.totalProducts} icon={Package} />
        <StatCard label="Total Leads" value={data.totalLeads} icon={Inbox} />
        <StatCard label="Monthly Leads" value={data.monthlyLeads} icon={TrendingUp} />
      </div>

      {/* Leads */}
      <RecentLeads leads={data.recentLeads} />

    </div>
  );
}