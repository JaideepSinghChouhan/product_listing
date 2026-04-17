import { Menu } from "lucide-react";

export default function Topbar({
  title,
  onOpenMenu,
}: {
  title: string;
  onOpenMenu?: () => void;
}) {
  return (
    <header className="h-16 px-4 sm:px-6 flex items-center gap-3 border-b bg-surface">
      <button
        onClick={onOpenMenu}
        className="md:hidden p-2 rounded-lg border"
        aria-label="Open admin menu"
      >
        <Menu className="w-4 h-4" />
      </button>
      <h1 className="text-lg font-playfair capitalize">{title}</h1>
    </header>
  );
}