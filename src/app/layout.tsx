import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BarkTranslator Pro",
  description: "Translate human scenarios into realistic dog bark audio using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
