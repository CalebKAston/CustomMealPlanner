import React from 'react';
import { useForm, OnSubmit } from 'react-hook-form';
import { SchedulePieceForm, SchedulePiece } from '../../pages/schedule-pieces';

interface SchedulePieceUpdateModalProps {
  id: string;
  selectedSchedulePiece: SchedulePiece;
  onFormSubmit: OnSubmit<SchedulePieceForm>;
}

const SchedulePieceUpdateModal = ({
  id,
  selectedSchedulePiece,
  onFormSubmit,
}: SchedulePieceUpdateModalProps) => {
  const { register, handleSubmit, errors, reset } = useForm<
    SchedulePieceForm
  >();

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
              Editing: {selectedSchedulePiece.name}
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
            onSubmit={handleSubmit((formData) => {
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
                  ref={register({
                    required: 'Name is required',
                  })}
                  defaultValue={selectedSchedulePiece.name}
                  className={`form-control ${
                    errors.name ? 'border-danger' : ''
                  }`}
                  id='name'
                />
                {errors.name && (
                  <small className='form-text text-danger'>
                    {errors.name.message}
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchedulePieceUpdateModal;
