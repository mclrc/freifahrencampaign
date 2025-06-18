import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Freifahren e.V.",
  description: "Kampagne für die Abschaffung der Ersatzfreiheitsstrafe und kostenlosen ÖPNV",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params
  return (
    <html lang={lang ?? 'de'}>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
