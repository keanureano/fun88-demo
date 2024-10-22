import { Menu, User, Wallet } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between pb-4">
      <div className="flex items-center gap-2">
        <Menu className="stroke-primary cursor-pointer hover:brightness-75 transition" />
        <h1 className="text-2xl italic font-black cursor-pointer hover:brightness-75 transition">
          FUN88
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Wallet className="stroke-muted-foreground cursor-pointer hover:brightness-75 transition" />
        <h2 className="font-semibold">$1990.6 | </h2>
        <User className="stroke-primary fill-primary cursor-pointer hover:brightness-75 transition" />
      </div>
    </nav>
  );
}
