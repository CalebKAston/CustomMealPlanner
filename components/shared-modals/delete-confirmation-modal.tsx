import React from 'react';

interface DeleteConfirmationModalProps {
  itemToDeleteName: string;
  onDeleteClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const DeleteConfirmationModal = ({
  itemToDeleteName,
  onDeleteClick,
}: DeleteConfirmationModalProps) => {
  return (
    <div className='modal-content'>
      <div className='modal-header'>
        <h5 className='modal-title' id='modalTitle'>
          Delete {itemToDeleteName}?
        </h5>
        <button
          type='button'
          className='close'
          data-dismiss='modal'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='modal-body'>Are you sure you want to delete this?</div>
      <div className='modal-footer'>
        <button
          type='button'
          className='btn btn-secondary'
          data-dismiss='modal'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={onDeleteClick}
          className='btn btn-danger'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
