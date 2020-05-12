import React from 'react';
import { useForm, OnSubmit } from 'react-hook-form';
import { MeasurementForm, Measurement } from '../../pages/measurements';

interface MeasurementUpdateModalProps {
  id: string;
  selectedMeasurement: Measurement;
  onFormSubmit: OnSubmit<MeasurementForm>;
}

const MeasurementUpdateModal = ({
  id,
  selectedMeasurement,
  onFormSubmit,
}: MeasurementUpdateModalProps) => {
  const { register, handleSubmit, errors, reset } = useForm<MeasurementForm>();

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
              Editing: {selectedMeasurement.name}
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
                <label htmlFor='updateMeasurementName'>Name</label>
                <input
                  type='text'
                  name='name'
                  ref={register({
                    required: 'Name is required',
                  })}
                  defaultValue={selectedMeasurement.name}
                  className={`form-control ${
                    errors.name ? 'border-danger' : ''
                  }`}
                  id='updateMeasurementName'
                />
                {errors.name && (
                  <small className='form-text text-danger'>
                    {errors.name.message}
                  </small>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='updateMeasurementDisplay'>Display</label>
                <input
                  type='text'
                  name='display'
                  ref={register({
                    required: 'Display is required',
                  })}
                  defaultValue={selectedMeasurement.display}
                  className={`form-control ${
                    errors.display ? 'border-danger' : ''
                  }`}
                  id='updateMeasurementDisplay'
                />
                {errors.display && (
                  <small className='form-text text-danger'>
                    {errors.display.message}
                  </small>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='updateMeasurementWeightOunces'>
                  Weight Ounces
                </label>
                <input
                  type='number'
                  min='0'
                  step='0.000001'
                  name='weightOunces'
                  ref={register}
                  defaultValue={selectedMeasurement.weightOunces}
                  className={`form-control`}
                  id='updateMeasurementWeightOunces'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='updateMeasurementFluidOunces'>
                  Fluid Ounces
                </label>
                <input
                  type='number'
                  min='0'
                  step='0.000001'
                  name='fluidOunces'
                  ref={register}
                  defaultValue={selectedMeasurement.fluidOunces}
                  className={`form-control`}
                  id='updateMeasurementFluidOunces'
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeasurementUpdateModal;
