import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Workflow Dashboard",
    description: "Project workflow management app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-gray-50`}
            >
                <div
                    className="fixed inset-0 -z-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(black 0.8px, transparent 0.5px)",
                        backgroundSize: "20px 20px",
                    }}
                ></div>

                <main className="min-h-screen flex flex-col gap-6 p-4">
                    {children}
                </main>
            </body>
        </html>
    );
}
