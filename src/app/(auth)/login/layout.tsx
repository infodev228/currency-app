export const metadata = {
  title: "Login",
  description: "Login page",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen">
      <main>{children}</main>
    </div>
  );
}
