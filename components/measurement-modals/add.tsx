import React from 'react';
import { useForm, OnSubmit } from 'react-hook-form';
import { MeasurementForm } from '../../pages/measurements';

interface MeasurementAddModalProps {
  id: string;
  onFormSubmit: OnSubmit<MeasurementForm>;
}

const MeasurementAddModal = ({
  id,
  onFormSubmit,
}: MeasurementAddModalProps) => {
  const {
    register: addRegister,
    handleSubmit: addHandleSubmit,
    errors: addErrors,
    reset,
  } = useForm<MeasurementForm>();

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
              Add Measurement
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
                <label htmlFor='measurementName'>Name</label>
                <input
                  type='text'
                  name='name'
                  ref={addRegister({
                    required: 'Name is required',
                  })}
                  className={`form-control ${
                    addErrors.name ? 'border-danger' : ''
                  }`}
                  id='measurementName'
                />
                {addErrors.name && (
                  <small className='form-text text-danger'>
                    {addErrors.name.message}
                  </small>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='measurementDisplay'>Display</label>
                <input
                  type='text'
                  name='display'
                  ref={addRegister({
                    required: 'Display is required',
                  })}
                  className={`form-control ${
                    addErrors.display ? 'border-danger' : ''
                  }`}
                  id='measurementDisplay'
                />
                {addErrors.display && (
                  <small className='form-text text-danger'>
                    {addErrors.display.message}
                  </small>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='measurementWeightOunces'>Weight Ounces</label>
                <input
                  type='number'
                  min='0'
                  step='0.000001'
                  name='weightOunces'
                  ref={addRegister}
                  className={`form-control`}
                  id='measurementWeightOunces'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='measurementFluidOunces'>Fluid Ounces</label>
                <input
                  type='number'
                  min='0'
                  step='0.000001'
                  name='fluidOunces'
                  ref={addRegister}
                  className={`form-control`}
                  id='measurementFluidOunces'
                />
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

export default MeasurementAddModal;
