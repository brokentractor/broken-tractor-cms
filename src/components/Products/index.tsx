import { useEffect, useState } from 'react'
import { Pencil2Icon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'

import Spinner from '../Spinner'
import BatchEditModal from './BatchEditModal'
import EditModal from './EditModal'
import UpdateSuccessModal from './UpdateSuccessModal'
import type { TOptionSet } from '@/interfaces/option-set'
import type { TProduct } from '@/interfaces/product'
import type { KeyedMutator } from 'swr'

type ProductsProps = {
  products: TProduct[]
  optionSets: TOptionSet[]
  mutate: KeyedMutator<TProduct[]>
  loadMore: () => void
  loadingMore: boolean
}

const Products = ({
  products, optionSets, mutate, loadMore, loadingMore, 
}: ProductsProps) => {
  const [ productCurrentlyEditing, setProductCurrentlyEditing ] = useState<TProduct | undefined>(undefined)
  const [ selectedProducts, setSelectedProducts ] = useState<Set<number>>(new Set())
  const [ selectAll, setSelectAll ] = useState(false)
  const [ filterOptionSetID, setFilterOptionSetID ] = useState<number | undefined>(undefined)
  const [ filteredProducts, setFilteredProducts ] = useState<TProduct[]>(products)
  const [ openEditModal, setOpenEditModal ] = useState(false)
  const [ openUpdateSuccessModal, setOpenUpdateSuccessModal ] = useState(false)

  const handleCheckboxChange = (productId: number) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected)
      if (newSelected.has(productId)) {
        newSelected.delete(productId)
      }
      else {
        newSelected.add(productId)
      }
      return newSelected
    })
  }

  const handleSelectAllChange = () => {
    setSelectAll((prevSelectAll) => {
      const newSelectAll = !prevSelectAll
      if (newSelectAll) {
        const allIds = products.map((product) => product.id)
        setSelectedProducts(new Set(allIds))
      }
      else {
        setSelectedProducts(new Set())
      }
      return newSelectAll
    })
  }

  useEffect(() => {
    if (filterOptionSetID) {
      setFilteredProducts(products.filter((product) => product.option_set_id === filterOptionSetID))
    }
    else {
      setFilteredProducts(products)
    }
  }, [ filterOptionSetID, products ])
  
  return (
    <div className="relative my-20 w-full px-10">
      <div className='fixed right-10 top-0 z-10 mb-2 flex w-[calc(100vw-336px)] justify-between gap-4 bg-white pt-10'>
        <form className="mx-auto max-w-md">   
          <label htmlFor="default-search" className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg className="size-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full border border-gray-300 bg-gray-50 px-4 py-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Search Mockups, Logos..." required />
          </div>
        </form>

        <div className="flex-1">
          <select 
            id="optionSetSelect" 
            className="block border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={filterOptionSetID || ''}
            onChange={(e) => setFilterOptionSetID(parseInt(e.target.value))}
          >
            <option value={undefined}>Filter by option set</option>
            {optionSets.map((optionSet) => (
              <option key={optionSet.id} value={optionSet.id.toString()}>
                {optionSet.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center">
          <span className="-translate-y-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Currently showing <em>{filteredProducts.length}</em> products
          </span>
        </div>
        <div className="shrink-0">
          <BatchEditModal 
            selectedProducts={selectedProducts}
            mutate={mutate}
            optionSets={optionSets}
          />
        </div>
      </div>
      <div className="relative mt-8 overflow-x-auto shadow-md">
        <table className="w-full table-fixed text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-8 p-4">
                <div className="flex items-center">
                  <input 
                    id="checkbox-all-search" 
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    className="size-4 border-gray-300 bg-gray-100 text-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="w-40 px-6 py-3">
                Option Set
              </th>
              <th scope="col" className="w-36 px-6 py-3">
                Date Created
              </th>
              <th scope="col" className="w-24 px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input 
                      id="checkbox-table-search-1"
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                      className="size-4 rounded  border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" className="w-80 truncate whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {product.name}
                </th>
                <td className="px-6 py-4">
                  {product.option_set_id ? 
                    optionSets.find((optionSet) => optionSet.id === product.option_set_id)?.name 
                    : '-'}
                </td>
                <td className="px-6 py-4">
                  {dayjs(product.date_created).format('MM/DD/YYYY')}
                </td>
                <td className="flex items-center px-6 py-4">
                  <button 
                    onClick={() => {
                      setProductCurrentlyEditing(product)
                      setOpenEditModal(true)
                    }}
                    className="bg-[#FEBD00] p-2 font-medium text-black hover:underline dark:opacity-80"
                  >
                    <Pencil2Icon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-center">
        <button 
          className={`min-w-12 bg-[#FEBD00] px-4 py-2 font-bold text-black shadow-sm hover:opacity-80 ${loadingMore ? 'cursor-not-allowed' : ''}`}
          onClick={loadMore}
          disabled={loadingMore}
        >
          {loadingMore ? <Spinner /> : 'Load More'}
        </button>
      </div>
      <EditModal 
        product={productCurrentlyEditing}
        optionSets={optionSets}
        mutate={mutate}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setOpenUpdateSuccessModal={setOpenUpdateSuccessModal}
      />
      <UpdateSuccessModal 
        openUpdateSuccessModal={openUpdateSuccessModal}
        setOpenUpdateSuccessModal={setOpenUpdateSuccessModal}
        setOpenEditModal={setOpenEditModal}
      />
    </div>
  )
}

export default Products
