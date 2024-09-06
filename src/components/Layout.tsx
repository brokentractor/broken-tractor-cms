import type { ReactNode } from 'react'

import Header from '@/components/Header'

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex min-h-screen">
      {/* Sidebar */}
      <Header />

      {/* Main content */}
      <div className="ml-64 flex justify-center">
        {children}
      </div>
    </main>
  )
}

export default Layout
