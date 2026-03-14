import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GreyShacks | Agentic Systems for Mid-Market Operations',
  description: 'The Architecture of Autonomous Operations. GreyShacks designs intelligent systems that eliminate manual workflows.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#0A0A0A] text-white selection:bg-blue-900/30">
        {children}
      </body>
    </html>
  );
}
