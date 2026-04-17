export default function RecentLeads({ leads }: any) {
  return (
    <div className="border rounded-xl bg-surface">
      <div className="p-4 border-b font-playfair text-lg">
        Recent Leads
      </div>
    
      <div className="divide-y">
        {leads?.map((lead: any) => (
          <div key={lead.id} className="p-4 text-sm grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 sm:items-center">
            <p className="font-medium truncate">{lead.name}</p>
            <p className="text-muted-foreground truncate">
              {lead?.requirement || "General Inquiry"}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(lead.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}