import { Navbar1 } from "./_components/navbar";
import { Footer } from "@/components/footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background:
          "linear-gradient(45deg, rgba(255, 153, 51,0.7) 33%, #fff 33%, #fff 66%, rgba(4,106,56,0.7) 66%)",
        minHeight: "100vh",
      }}
    >
      <Navbar1 />
      {children}
      <Footer />
    </div>
  );
}
