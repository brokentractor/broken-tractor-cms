import type { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import type { TMountain } from '@/interfaces/mountains'

type GridProps = {
  mountains: TMountain[]
  featuredMountain?: TMountain
  setFeaturedMountain: Dispatch<SetStateAction<TMountain | undefined>>
}

const Grid = ({ mountains, featuredMountain, setFeaturedMountain }: GridProps) => {
  return (
    <div className="grid w-3/5 grid-cols-3 gap-2 bg-slate-600">
      {mountains.map((mountain: TMountain) => {
        const isFeatured = mountain === featuredMountain

        return (
          <div
            key={mountain.rank}
            onMouseOver={() => setFeaturedMountain(mountain)}
            onMouseLeave={() => setFeaturedMountain(undefined)}
          >
            <h1>{mountain.englishName}</h1>
            <div className={`${featuredMountain && !isFeatured && 'opacity-30'}`}>
              <Image src={mountain.image} alt={mountain.englishName} width={300} height={200} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Grid
