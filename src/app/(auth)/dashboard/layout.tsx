"use client";
import "../../../app/globals.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const handleLogout = () => {
    document.cookie = "authToken=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <div>
      <header className="m-2 p-4 flex">
        <button
          className=" bg-slate-600 text-white rounded p-2 "
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <main> {children}</main>
    </div>
  );
}
