
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { updateProduct } from '@/data/api/product'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import Spinner from '../Spinner'
import type { TOptionSet } from '@/interfaces/option-set'
import type { TProduct } from '@/interfaces/product'

type EditModalProps = {
  product: TProduct | undefined
  optionSets: TOptionSet[]
  openEditModal: boolean
  setOpenEditModal: Dispatch<SetStateAction<boolean>>
  setOpenUpdateSuccessModal: Dispatch<SetStateAction<boolean>>
  setUpdateType: Dispatch<SetStateAction<'update' | 'delete'>>
}

const EditModal = ({ 
  product,
  optionSets,
  openEditModal,
  setOpenEditModal,
  setOpenUpdateSuccessModal,
  setUpdateType,
}: EditModalProps) => {
  const [ removeLoading, setRemoveLoading ] = useState(false)
  const [ updateLoading, setUpdateLoading ] = useState(false)

  const [ optionSetID, setOptionSetID ] = useState<number | undefined>(
    product?.option_set_id !== null ? product?.option_set_id : undefined,
  )

  if(!product) {
    return
  }

  const removeOptionSetID = async () => {
    setRemoveLoading(true)

    try {
      await updateProduct(product.id.toString(), { option_set_id: null })
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update product:', error)
    }
    finally {
      setUpdateType('delete')
      setRemoveLoading(false)
      product.option_set_id = null
      setOpenUpdateSuccessModal(true)
    }
  }
  
  const updateOptionSetID = async () => {
    setUpdateLoading(true)
    if (optionSetID && optionSetID != product.option_set_id) {
      try {
        await updateProduct(product.id.toString(), { option_set_id: optionSetID })
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to update product:', error)
      }
      finally {
        setUpdateType('update')
        setUpdateLoading(false)
        product.option_set_id = optionSetID
        setOpenUpdateSuccessModal(true)

      }
    }
  }

  return (
    <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <p className='mt-6'>Update the option set</p>
        <div className="my-6 mt-4 flex justify-between gap-2">
          <div>
            <select 
              id="optionSetSelect" 
              className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              value={optionSetID || ''}
              onChange={(e) => setOptionSetID(parseInt(e.target.value))}
            >
              <option value="">Choose an option set</option>
              {optionSets.map((optionSet) => (
                <option key={optionSet.id} value={optionSet.id.toString()}>
                  {optionSet.name}
                </option>
              ))}
            </select>
          </div>
          <button 
            onClick={updateOptionSetID}
            className="flex h-10 w-44 items-center justify-center bg-[#FEBD00] px-5 py-2.5 text-center text-sm font-medium text-black hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white disabled:hover:bg-gray-300 disabled:dark:bg-gray-300 disabled:dark:hover:bg-gray-300"
            disabled={updateLoading 
              || !optionSetID 
              || optionSetID === product.option_set_id 
              || optionSetID === 0
            }
          >
            {updateLoading ? <Spinner /> : 'Update Option Set'}
          </button>
        </div>
        <p>Delete the option set</p>
        <div className='flex items-center justify-center gap-2'>
          <button 
            className="mt-4 flex h-10 w-full items-center justify-center bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:dark:bg-gray-300 disabled:dark:hover:bg-gray-300"
            disabled={!product.option_set_id || removeLoading}
            onClick={removeOptionSetID}
          >
            {removeLoading ? <Spinner /> : 'Remove option set'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal