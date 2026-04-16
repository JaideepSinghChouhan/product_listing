export default function StatCard({ label, value=0, icon: Icon }: any) {
  return (
    <div className="p-5 border rounded-xl">
      <div className="flex justify-between mb-3">
        <div className="p-2 bg-accent/10 rounded-lg">
            <Icon className="w-5 h-5 text-accent" />
        </div>
      </div>
      <p className="text-3xl font-bold ml-2">{value}</p>
      <p className="text-xs pt-2 ml-2 text-muted-foreground">
        {label.toUpperCase()}
      </p>
    </div>
  );
}