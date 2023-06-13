import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar border-b border-gray-300">
          <div className="container py-3 px-5">
            {/* <img src={logo} alt="" /> */}
            <img src="./logoipsum-260.svg" alt="" width={150} height={150} />
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
