import { useState } from 'react'
import dayjs from 'dayjs'
import type { TProduct } from '@/interfaces/product'

type ProductsProps = {
  products: TProduct[]
}

const Products = ({ products }: ProductsProps) => {
  const [ selectedProducts, setSelectedProducts ] = useState<Set<number>>(new Set())
  const [ selectAll, setSelectAll ] = useState(false)

  console.log('selectedProducts: ', selectedProducts)

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
  
  return (
    <div className="relative my-20 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input 
                  id="checkbox-all-search" 
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className="size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Date Created
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input 
                    id="checkbox-table-search-1"
                    type="checkbox"
                    checked={selectedProducts.has(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                    className="size-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                {product.name}
              </th>
              <td className="px-6 py-4">
                {product.type}
              </td>
              <td className="px-6 py-4">
                {dayjs(product.date_created).format('MM/DD/YYYY')}
              </td>
              <td className="flex items-center px-6 py-4">
                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Products