export default function RecentLeads({ leads }: any) {
  return (
    <div className="border rounded-xl bg-surface">
      <div className="p-4 border-b font-playfair text-lg">
        Recent Leads
      </div>
    
      <div className="divide-y">
        {leads?.map((lead: any) => (
          <div key={lead.id} className="p-4 align-middle items-center text-sm flex justify-between items-center">
            <p className="font-medium">{lead.name}</p>
            <p className="text-muted-foreground">
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