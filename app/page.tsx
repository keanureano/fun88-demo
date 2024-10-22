import Banner from "@/components/Banner";
import Games from "@/components/Games";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="max-w-xl min-h-[101dvh] p-2 mx-auto text-primary">
      <Navbar />
      <Banner />
      <Games />
    </main>
  );
}
