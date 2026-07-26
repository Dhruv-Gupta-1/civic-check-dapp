import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CivicCheck — Web3 Civic Accountability dApp',
  description: 'Track tax-funded public project proposals and vote on-chain.',
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
