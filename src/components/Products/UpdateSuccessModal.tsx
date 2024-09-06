
import type { Dispatch, SetStateAction } from 'react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'

type UpdateSuccessModalProps = {
  openUpdateSuccessModal: boolean
  setOpenUpdateSuccessModal: Dispatch<SetStateAction<boolean>>
  setOpenEditModal: Dispatch<SetStateAction<boolean>>
  updateType: 'update' | 'delete'
}

const UpdateSuccessModal = ({ 
  openUpdateSuccessModal,
  setOpenUpdateSuccessModal,
  setOpenEditModal,
  updateType,
}: UpdateSuccessModalProps) => {
  return (
    <Dialog 
      open={openUpdateSuccessModal}
      onOpenChange={setOpenUpdateSuccessModal}
    >
      <DialogContent className='z-50'>
        <DialogHeader>
          <DialogTitle>Option Set successfully {updateType}d</DialogTitle>
        </DialogHeader>
        
        <button
          className="bg-[#FEBD00] px-5 py-2.5 text-center text-sm font-medium text-black hover:opacity-80 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white disabled:hover:bg-gray-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:dark:bg-gray-300 disabled:dark:hover:bg-gray-300"
          onClick={() => {
            setOpenUpdateSuccessModal(false)
            setOpenEditModal(false)
          }}
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateSuccessModal