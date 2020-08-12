import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actionTypes } from '../store';
import IngredientAddModal from '../components/ingredient-modals/add';
import DeleteConfirmationModal from '../components/shared-modals/delete-confirmation-modal';
import IngredientUpdateModal from '../components/ingredient-modals/update';
import IngredientViewModal from '../components/ingredient-modals/view';
import { withRedux } from '../lib/redux';
import {
  ExpandCollapse,
  ExpandCollapseButton,
} from '../components/expand-collapse';
import Filter from '../components/filter';

const CursorPointerDiv = styled.div`
  cursor: pointer;
`;

export interface IngredientCategory {
  name: string;
  id: number;
}

export interface Ingredient {
  name: string;
  category?: IngredientCategory;
  id: number;
}

export interface IngredientForm {
  name: string;
  categoryId?: number;
}

const Ingredients = () => {
  const dispatch = useDispatch();
  const [nameFilter, setNameFilter] = useState('');
  const ingredients = useSelector(state => state.ingredients);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();
  const [updating, setUpdating] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const ingredientCategories = useSelector(state => state.ingredientCategories);

  const filterFn = (item: Ingredient) => {
    return nameFilter ? new RegExp(nameFilter, 'i').test(item.name) : true;
  };

  useEffect(() => {
    $('#modal').on('hidden.bs.modal', function (e) {
      setAdding(false);
      setUpdating(false);
      setDeleting(false);
      setSelectedIngredient(null);
    });

    $('.collapse').collapse({
      toggle: false,
    });
  });

  const openModal = () => {
    $('#modal').modal('show');
  };

  const closeModal = () => {
    $('#modal').modal('hide');
  };

  const updateItem = (formData: IngredientForm) => {
    const category = formData.categoryId
      ? Object.assign(
          {},
          ingredientCategories.find(ingCat => ingCat.id == formData.categoryId)
        )
      : null;
    const ingredient: Ingredient = {
      name: formData.name,
      id: selectedIngredient.id,
      category,
    };
    dispatch({
      type: actionTypes.ingredients.update,
      id: selectedIngredient.id,
      ingredient,
    });
    setUpdating(false);
    closeModal();
  };

  const addItem = (formData: IngredientForm) => {
    const category = formData.categoryId
      ? Object.assign(
          {},
          ingredientCategories.find(ingCat => ingCat.id == formData.categoryId)
        )
      : null;
    const ingredient: Ingredient = {
      name: formData.name,
      id: Math.floor(Math.random() * 10000) + 1,
      category,
    };
    dispatch({
      type: actionTypes.ingredients.add,
      ingredient,
    });
    setAdding(false);
    closeModal();
  };

  const deleteItem = () => {
    dispatch({
      type: actionTypes.ingredients.remove,
      ingredient: selectedIngredient,
    });
    setDeleting(false);
    setSelectedIngredient(null);
    closeModal();
  };

  const addIngredientCategory = (name: string) => {
    dispatch({
      type: actionTypes.ingredientCategories.add,
      ingredientCategory: {
        name,
        id: Math.floor(Math.random() * 10000) + 1,
      },
    });
  };

  const visibleIngredientsWithNoCategory = ingredients
    .filter(filterFn)
    .filter(ing => !ing.category);

  return (
    <>
      <div className='row mb-3'>
        <Filter>
          <div className='col-6'>
            <div className='form-group'>
              <label htmlFor='nameFilter'>Name</label>
              <input
                type='text'
                name='name'
                className={`form-control`}
                value={nameFilter}
                onChange={e => setNameFilter(e.target.value)}
                id='nameFilter'
              />
            </div>
          </div>
        </Filter>
        <div className='col-12 mt-3'>
          <button
            className='btn btn-success w-100'
            onClick={() => {
              setAdding(true);
              openModal();
            }}
          >
            Add New Ingredient
          </button>
        </div>
      </div>
      <div className='row'>
        {ingredients.length === 0 && (
          <div className='col-12 text-center'>
            No ingredients available. Create one!
          </div>
        )}
        {visibleIngredientsWithNoCategory.length > 0 && (
          <>
            <div className='col-12'>
              <ExpandCollapseButton
                className='btn btn-secondary w-100'
                target='uncategorized'
              >
                {`Uncategorized (${visibleIngredientsWithNoCategory.length})`}
              </ExpandCollapseButton>
            </div>
            <div className='col-12 mb-3'>
              <ExpandCollapse id='uncategorized' border={true}>
                {visibleIngredientsWithNoCategory.map(ingredient => (
                  <div className='col-4 mb-3' key={ingredient.name}>
                    <CursorPointerDiv
                      className='card'
                      onClick={() => {
                        setSelectedIngredient(ingredient);
                        openModal();
                      }}
                    >
                      <div className='card-body'>
                        <h5 className='card-title'>{ingredient.name}</h5>
                        <div className='card-text'>No details to display</div>
                      </div>
                    </CursorPointerDiv>
                  </div>
                ))}
              </ExpandCollapse>
            </div>
          </>
        )}
        {ingredientCategories.map((ic, index) => {
          const visibleIngredientsInCategory = ingredients
            .filter(filterFn)
            .filter(ing => (ing.category ? ing.category.id === ic.id : false));
          if (visibleIngredientsInCategory.length > 0) {
            return (
              <React.Fragment key={ic.id}>
                <div className='col-12'>
                  <ExpandCollapseButton
                    className='btn btn-secondary w-100'
                    target={`category${ic.id}-${index}`}
                    defaultExpanded={false}
                  >
                    {`${ic.name} (${visibleIngredientsInCategory.length})`}
                  </ExpandCollapseButton>
                </div>
                <div className='col-12 mb-3'>
                  <ExpandCollapse
                    id={`category${ic.id}-${index}`}
                    border={true}
                  >
                    {visibleIngredientsInCategory.map(ingredient => (
                      <div className='col-4 mb-3' key={ingredient.name}>
                        <CursorPointerDiv
                          className='card'
                          onClick={() => {
                            setSelectedIngredient(ingredient);
                            openModal();
                          }}
                        >
                          <div className='card-body'>
                            <h5 className='card-title'>{ingredient.name}</h5>
                            <div className='card-text'>
                              No details to display
                            </div>
                          </div>
                        </CursorPointerDiv>
                      </div>
                    ))}
                  </ExpandCollapse>
                </div>
              </React.Fragment>
            );
          }
        })}
      </div>
      <div
        className='modal fade'
        id='modal'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='modalTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          {adding && (
            <IngredientAddModal
              onFormSubmit={formData => addItem(formData)}
              categories={ingredientCategories}
              onAddCategory={addIngredientCategory}
            />
          )}
          {selectedIngredient && !adding && !updating && !deleting && (
            <IngredientViewModal
              selectedIngredient={selectedIngredient}
              onDeleteClick={() => setDeleting(true)}
              onEditClick={() => setUpdating(true)}
            />
          )}
          {selectedIngredient && updating && (
            <IngredientUpdateModal
              selectedIngredient={selectedIngredient}
              categories={ingredientCategories}
              onFormSubmit={formData => updateItem(formData)}
            />
          )}
          {selectedIngredient && deleting && (
            <DeleteConfirmationModal
              itemToDeleteName={selectedIngredient.name}
              onDeleteClick={() => deleteItem()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default withRedux(Ingredients);
