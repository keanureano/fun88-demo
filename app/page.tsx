import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="container min-h-screen p-2 text-primary">
      <Navbar />
      <Banner />
    </main>
  );
}
