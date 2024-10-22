import { Dices, Star, UserRoundPlus, Volleyball, Wallet } from "lucide-react";
import { Button } from "./ui/button";

const footerButtons = [
  { icon: <Volleyball />, label: "SPORTS" },
  { icon: <Star />, label: "FAVORITES" },
  { icon: <UserRoundPlus />, label: "INVITE" },
  { icon: <Dices />, label: "CASINO LIVE" },
  { icon: <Wallet />, label: "CASHIER" },
];

export default function Footer() {
  return (
    <footer className="p-1 fixed bottom-0 left-0 flex justify-evenly w-full bg-background text-sm">
      {footerButtons.map(({ icon, label }, index) => (
        <Button
          key={index}
          variant="ghost"
          className="h-full flex flex-col gap-0"
        >
          {icon}
          <p>{label}</p>
        </Button>
      ))}
    </footer>
  );
}
