import React from 'react';
import { useForm, OnSubmit } from 'react-hook-form';
import { SchedulePieceForm } from '../../pages/schedule-pieces';

interface SchedulePieceAddModalProps {
  onFormSubmit: OnSubmit<SchedulePieceForm>;
}

const SchedulePieceAddModal = ({
  onFormSubmit,
}: SchedulePieceAddModalProps) => {
  const {
    register: addRegister,
    handleSubmit: addHandleSubmit,
    errors: addErrors,
    reset,
  } = useForm<SchedulePieceForm>();

  return (
    <div className='modal-content'>
      <div className='modal-header'>
        <h5 className='modal-title' id='modalTitle'>
          Add Schedule Piece
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
      <form
        onSubmit={addHandleSubmit(formData => {
          onFormSubmit(formData);
          reset();
        })}
      >
        <div className='modal-body'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              ref={addRegister({
                required: 'Name is required',
              })}
              className={`form-control ${
                addErrors.name ? 'border-danger' : ''
              }`}
              id='name'
            />
            {addErrors.name && (
              <small className='form-text text-danger'>
                {addErrors.name.message}
              </small>
            )}
          </div>
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-secondary'
            data-dismiss='modal'
          >
            Cancel
          </button>
          <button type='submit' className='btn btn-primary'>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchedulePieceAddModal;
