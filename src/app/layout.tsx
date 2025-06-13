import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Deleau Buis - Ferienwohnung in der Provence",
  description: "Ferien mitten drin - in der Natur, der Kultur, im provençalischen Marktgeschehen von Buis les Baronnies",
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
