import { LogOut, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Topbar({
  title,
  onOpenMenu,
}: {
  title: string;
  onOpenMenu?: () => void;
}) {
  const router = useRouter();
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("adminUser");

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setAdminEmail(parsed?.email || "");
    } catch {
      setAdminEmail("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("token");
    router.replace("/admin/login");
  };

  return (
    <header className="h-16 px-4 sm:px-6 flex items-center gap-3 border-b bg-surface">
      <button
        onClick={onOpenMenu}
        className="md:hidden p-2 rounded-lg border"
        aria-label="Open admin menu"
      >
        <Menu className="w-4 h-4" />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-playfair capitalize">{title}</h1>
        {adminEmail && (
          <p className="text-xs text-muted-foreground truncate">{adminEmail}</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm hover:bg-surface-elevated"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </header>
  );
}