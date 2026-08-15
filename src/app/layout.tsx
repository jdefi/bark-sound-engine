import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BarkTranslator Pro",
  description: "Translate human scenarios into realistic dog bark audio using AI",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "BarkTranslator Pro",
    description: "Translate human scenarios into realistic dog bark audio using AI",
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BarkTranslator Pro",
    description: "Translate human scenarios into realistic dog bark audio using AI",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: '#0f0c29' }}>{children}</body>
    </html>
  );
}
