export const metadata = {
  title: "BarkTranslator Pro",
  description: "Translate human scenarios into realistic dog bark audio using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
