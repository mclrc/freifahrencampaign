import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Deleau Buis - Ferienwohnung in der Provence",
  description: "Ferien mitten drin - in der Natur, der Kultur, im provençalischen Marktgeschehen von Buis les Baronnies",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang ?? 'de'}>
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
