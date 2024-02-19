import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import  RecoilContext  from './recoilContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fidoo Chat App",
  description: "simple chat app with next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilContext>{children}</RecoilContext>
        <ToastContainer/>
      </body>
    </html>
  );
}
