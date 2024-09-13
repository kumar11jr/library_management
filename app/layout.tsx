import './globals.css';

import NavBar from '@/components/Navbar';

export const metadata = {
  title: 'Library Management System',
  description: 'A simple library management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
