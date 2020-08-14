import React, { useState } from 'react';
import { useForm, OnSubmit } from 'react-hook-form';
import { IngredientCategory, IngredientForm } from '../../pages/ingredients';
import { ExpandCollapseButton, ExpandCollapse } from '../expand-collapse';
import AddIngredientCategory from '../add-ingredient-category';

interface IngredientAddModalProps {
  onFormSubmit: OnSubmit<IngredientForm>;
  categories: IngredientCategory[];
  onAddCategory: any;
}

const IngredientAddModal = ({
  onFormSubmit,
  categories,
  onAddCategory,
}: IngredientAddModalProps) => {
  const {
    register,
    handleSubmit: addHandleSubmit,
    errors: addErrors,
    reset,
  } = useForm<IngredientForm>();

  const [newCategoryName, setNewCategoryName] = useState('');

  return (
    <div className='modal-content'>
      <div className='modal-header'>
        <h5 className='modal-title' id='modalTitle'>
          Add Ingredient
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
              ref={register({
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
          <div className='form-group'>
            <label htmlFor='category'>Category</label>
            <select
              className='form-control'
              name='categoryId'
              ref={register}
              id='category'
            >
              <option value={null}></option>
              {categories.map((category, index) => (
                <option key={category.name + index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <AddIngredientCategory />
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

export default IngredientAddModal;
