
import type { Dispatch, SetStateAction } from 'react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'

type UpdateSuccessModalProps = {
  openUpdateSuccessModal: boolean
  setOpenUpdateSuccessModal: Dispatch<SetStateAction<boolean>>
  setOpenEditModal: Dispatch<SetStateAction<boolean>>
}

const UpdateSuccessModal = ({ 
  openUpdateSuccessModal,
  setOpenUpdateSuccessModal,
  setOpenEditModal,
}: UpdateSuccessModalProps) => {
  return (
    <Dialog 
      open={openUpdateSuccessModal}
      onOpenChange={setOpenUpdateSuccessModal}
    >
      <DialogContent className='z-50'>
        <DialogHeader>
          <DialogTitle>Option Set successfully deleted</DialogTitle>
        </DialogHeader>
        
        <button onClick={() => {
          setOpenUpdateSuccessModal(false)
          setOpenEditModal(false)
        }}
        >Close</button>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateSuccessModal