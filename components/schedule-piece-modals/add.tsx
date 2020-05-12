import React from 'react';
import { useForm, OnSubmit } from 'react-hook-form';
import { SchedulePieceForm } from '../../pages/schedule-pieces';

interface SchedulePieceAddModalProps {
  id: string;
  onFormSubmit: OnSubmit<SchedulePieceForm>;
}

const SchedulePieceAddModal = ({
  id,
  onFormSubmit,
}: SchedulePieceAddModalProps) => {
  const {
    register: addRegister,
    handleSubmit: addHandleSubmit,
    errors: addErrors,
    reset,
  } = useForm<SchedulePieceForm>();

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
            onSubmit={addHandleSubmit((formData) => {
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
      </div>
    </div>
  );
};

export default SchedulePieceAddModal;
