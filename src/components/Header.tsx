import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()
  
  return (
    <header className="fixed top-0 z-10 w-full border-b border-black p-3 text-sm text-black backdrop-blur-md">
      <div className="relative flex items-center justify-between">
        <Link href="/">
          <p className="">
            Broken Tractor
          </p>
        </Link>
        <p className="">
      Login
        </p>
      </div>
    </header>

  )
}

export default Header
