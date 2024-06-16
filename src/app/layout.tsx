"use client"

import { useState, useEffect } from 'react';
import { Loading } from '@/components/Loading'
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Change the delay as needed

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <Head>
  <title>Matara La perla de Antabamba</title>
  <link rel="icon" href="/logo_matara.ico" />
</Head>
      <body className={inter.className}>

{
  loading ? <Loading /> : <>
        <Header />
        {children}
  </>
}

</body>
    </html>
  );
}

