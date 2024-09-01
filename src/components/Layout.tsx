import type { ReactNode } from 'react'

import Header from '@/components/Header'

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex w-full items-center justify-center">
        {children}
      </div>
    </main>
  )
}

export default Layout