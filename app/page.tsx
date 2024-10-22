import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Games from "@/components/Games";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="max-w-xl min-h-[101dvh] p-2 mx-auto text-primary">
      <Navbar />
      <Banner />
      <Games />
      <Toaster />
      <Footer />
    </main>
  );
}
