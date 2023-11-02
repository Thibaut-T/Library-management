import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import BooksPage from './books/page';
import Navbar from './components/navBar';
import Home from './page';
import ProfilePage from './users/page';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library',
  description: 'Book management system',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (

    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
