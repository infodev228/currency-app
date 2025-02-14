import Header from "@/components/header";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Analytics />
      <Footer />
    </>
  );
}
