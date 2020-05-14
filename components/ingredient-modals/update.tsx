import React from 'react';
import { useForm, OnSubmit } from 'react-hook-form';
import {
  IngredientForm,
  Ingredient,
  IngredientCategory,
} from '../../pages/ingredients';

interface IngredientUpdateModalProps {
  selectedIngredient: Ingredient;
  categories: IngredientCategory[];
  onFormSubmit: OnSubmit<IngredientForm>;
}

const IngredientUpdateModal = ({
  selectedIngredient,
  categories,
  onFormSubmit,
}: IngredientUpdateModalProps) => {
  const { register, handleSubmit, errors, reset } = useForm<IngredientForm>();

  return (
    <div className='modal-content'>
      <div className='modal-header'>
        <h5 className='modal-title' id='modalTitle'>
          Editing: {selectedIngredient.name}
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
        onSubmit={handleSubmit(formData => {
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
              defaultValue={selectedIngredient.name}
              className={`form-control ${errors.name ? 'border-danger' : ''}`}
              id='name'
            />
            {errors.name && (
              <small className='form-text text-danger'>
                {errors.name.message}
              </small>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='category'>Category</label>
            <select
              className='form-control'
              name='categoryId'
              ref={register}
              id='category'
              defaultValue={selectedIngredient.category.id}
            >
              <option value={null}></option>
              {categories.map((category, index) => (
                <option key={category.name + index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
  );
};

export default IngredientUpdateModal;
