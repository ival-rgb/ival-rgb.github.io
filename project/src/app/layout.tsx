import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'history ost - via',
  description: 'Original soundtrack for history by via.',
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
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#FAF9FA]">
        {children}
      </body>
    </html>
  );
}
