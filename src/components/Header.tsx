import Link from 'next/link'

const Header = () => {  
  return (
    <header className="fixed top-0 z-10 w-full border-b border-black p-3 text-sm text-black backdrop-blur-md">
      <div className="relative flex items-center justify-between">
        <Link href="/">
          <p className="">
            Broken Tractor
          </p>
        </Link>
      </div>
    </header>

  )
}

export default Header
