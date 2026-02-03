import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "UPPITY Stock Guide",
    description: "Stock market guide for Korean and US markets",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}
