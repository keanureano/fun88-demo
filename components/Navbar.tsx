import { Menu, User, Wallet } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between pb-4">
      <div className="flex items-center gap-2">
        <Menu className="stroke-primary" />
        <h1 className="text-2xl italic font-black">FUN88</h1>
      </div>
      <div className="flex items-center gap-2">
        <Wallet className="stroke-muted-foreground" />
        <h2 className="font-semibold">$1990.6 | </h2>
        <User className="stroke-primary fill-primary" />
      </div>
    </nav>
  );
}
