import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-160px)] max-w-[1100px] px-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
