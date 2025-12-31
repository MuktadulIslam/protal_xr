import Sidebar from "@/components/portal/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<div className="flex min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
            {children}
        </main>
    </div>
    );
}
