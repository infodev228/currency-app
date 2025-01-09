import "../../globals.css";

export const metadata = {
  title: "Login - Next.js",
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
    <html lang="en">
      <body>
        <div className="login-layout">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
