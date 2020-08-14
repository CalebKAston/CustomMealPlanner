import React, { useState } from 'react';
import { ExpandCollapseButton, ExpandCollapse } from './expand-collapse';
import { actionTypes } from '../store';
import { useDispatch } from 'react-redux';

const AddIngredientCategory = () => {
  const dispatch = useDispatch();
  const [newCategoryName, setNewCategoryName] = useState('');

  const addIngredientCategory = (name: string) => {
    dispatch({
      type: actionTypes.ingredientCategories.add,
      ingredientCategory: {
        name,
        id: Math.floor(Math.random() * 10000) + 1,
      },
    });
  };

  return (
    <>
      <div className='w-100'>
        <ExpandCollapseButton
          className='btn btn-success w-100'
          target='addIngredientCategory'
        >
          + Add Ingredient Category
        </ExpandCollapseButton>
      </div>
      <div className='w-100 mb-3'>
        <ExpandCollapse id='addIngredientCategory' border={false}>
          <div className='form-group mb-3 pt-2 w-100'>
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
              addIngredientCategory(newCategoryName);
              setNewCategoryName('');
              $('#addIngredientCategory').collapse('hide');
            }}
          >
            Create Category
          </button>
        </ExpandCollapse>
      </div>
    </>
  );
};

export default AddIngredientCategory;
