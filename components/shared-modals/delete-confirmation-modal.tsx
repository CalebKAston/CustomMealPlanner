import React from 'react';

interface DeleteConfirmationModalProps {
  id: string;
  itemToDeleteName: string;
  onDeleteClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const DeleteConfirmationModal = ({
  id,
  itemToDeleteName,
  onDeleteClick,
}: DeleteConfirmationModalProps) => {
  return (
    <div
      className='modal fade'
      id={id}
      tabIndex={-1}
      role='dialog'
      aria-labelledby={`${id}Title`}
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id={`${id}Title`}>
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
          <div className='modal-body'>
            Are you sure you want to delete this?
          </div>
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
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
