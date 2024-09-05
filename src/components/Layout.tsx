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
      <div className="ml-64 flex flex-1 items-center justify-center">
        {children}
      </div>
    </main>
  )
}

export default Layout
