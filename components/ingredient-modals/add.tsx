import React, { useState } from 'react';
import { useForm, OnSubmit } from 'react-hook-form';
import { IngredientCategory, IngredientForm } from '../../pages/ingredients';

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
          <div className='w-100'>
            <button
              className='btn btn-success w-100'
              type='button'
              data-toggle='collapse'
              data-target='#addIngredientCategory'
              aria-expanded='true'
              aria-controls='addIngredientCategory'
            >
              + Add Ingredient Category
            </button>
          </div>
          <div className='w-100 mb-3'>
            <div className='collapse' id='addIngredientCategory'>
              <div className='form-group mb-3 pt-2'>
                <label htmlFor='name'>Category Name</label>
                <input
                  type='text'
                  value={newCategoryName}
                  onChange={e => setNewCategoryName(e.target.value)}
                  name='categoryName'
                  className={`form-control`}
                  id='categoryName'
                />
              </div>
              <button
                disabled={newCategoryName === ''}
                className='btn btn-info w-100'
                type='button'
                onClick={() => {
                  onAddCategory(newCategoryName);
                  setNewCategoryName('');
                  $('#addIngredientCategory').collapse('hide');
                }}
              >
                Create Category
              </button>
            </div>
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

export default IngredientAddModal;
