export default function Topbar({ title }: { title: string }) {
  return (
    <header className="h-16 px-6 flex items-center border-b bg-surface">
      <h1 className="text-lg font-playfair capitalize">{title}</h1>
    </header>
  );
}