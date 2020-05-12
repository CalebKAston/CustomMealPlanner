import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actionTypes } from '../store';
import SchedulePieceAddModal from '../components/schedule-piece-modals/add';
import DeleteConfirmationModal from '../components/shared-modals/delete-confirmation-modal';
import SchedulePieceUpdateModal from '../components/schedule-piece-modals/update';
import SchedulePieceViewModal from '../components/schedule-piece-modals/view';

const CursorPointerDiv = styled.div`
  cursor: pointer;
`;

export interface SchedulePiece {
  name: string;
  id: number;
}

export interface SchedulePieceForm {
  name: string;
}

const SchedulePieces = () => {
  const dispatch = useDispatch();
  const [nameFilter, setNameFilter] = useState('');
  const filterFn = (item: SchedulePiece) => {
    return nameFilter ? new RegExp(nameFilter, 'i').test(item.name) : true;
  };
  const schedulePieces = useSelector((state) => state.schedulePieces);
  const [selectedSchedulePiece, setSelectedSchedulePiece] = useState<
    SchedulePiece
  >(schedulePieces.length > 0 ? schedulePieces[0] : null);

  const setSelectedSchedulePieceAndOpenModal = (
    schedulePiece: SchedulePiece
  ) => {
    setSelectedSchedulePiece(schedulePiece);
    $('#view').modal('show');
  };

  const openUpdateModal = () => {
    $('#view').modal('hide');
    $('#update').modal('show');
  };

  const updateItem = (formData: SchedulePieceForm) => {
    dispatch({
      type: actionTypes.schedulePieces.update,
      id: selectedSchedulePiece.id,
      schedulePiece: formData,
    });
    $('#update').modal('hide');
  };

  const openAddModal = () => {
    $('#add').modal('show');
  };

  const addItem = (formData: SchedulePieceForm) => {
    dispatch({
      type: actionTypes.schedulePieces.add,
      schedulePiece: { ...formData, id: 10 },
    });
    $('#add').modal('hide');
  };

  const openDeleteModal = () => {
    $('#view').modal('hide');
    $('#delete').modal('show');
  };

  const deleteItem = () => {
    dispatch({
      type: actionTypes.schedulePieces.remove,
      schedulePiece: selectedSchedulePiece,
    });
    $('#view').modal('hide');
    $('#delete').modal('hide');
    setSelectedSchedulePiece(
      schedulePieces.length > 0 ? schedulePieces[0] : null
    );
  };

  return (
    <>
      <div className='row mb-3'>
        <div className='col-12'>
          <button
            className='btn btn-secondary w-100'
            type='button'
            data-toggle='collapse'
            data-target='#filter'
            aria-expanded='false'
            aria-controls='filter'
          >
            Filter
          </button>
        </div>
        <div className='col-12'>
          <div className='collapse border' id='filter'>
            <div className='col-6 pt-3'>
              <div className='form-group'>
                <label htmlFor='nameFilter'>Name</label>
                <input
                  type='text'
                  name='name'
                  className={`form-control`}
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  id='nameFilter'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 mt-3'>
          <button
            className='btn btn-success w-100'
            onClick={() => openAddModal()}
          >
            Add New Schedule Piece
          </button>
        </div>
      </div>
      <div className='row'>
        {schedulePieces.length === 0 && (
          <div className='col-12 text-center'>
            No schedule pieces available. Create one!
          </div>
        )}
        {schedulePieces.filter(filterFn).map((schedulePiece) => (
          <div className='col-4 mb-3' key={schedulePiece.name}>
            <CursorPointerDiv
              className='card'
              onClick={() =>
                setSelectedSchedulePieceAndOpenModal(schedulePiece)
              }
            >
              <div className='card-body'>
                <h5 className='card-title'>{schedulePiece.name}</h5>
                <div className='card-text'>No details to display</div>
              </div>
            </CursorPointerDiv>
          </div>
        ))}
      </div>
      {selectedSchedulePiece && (
        <SchedulePieceViewModal
          id='view'
          selectedSchedulePiece={selectedSchedulePiece}
          onDeleteClick={() => openDeleteModal()}
          onEditClick={() => openUpdateModal()}
        />
      )}
      {selectedSchedulePiece && (
        <SchedulePieceUpdateModal
          id='update'
          selectedSchedulePiece={selectedSchedulePiece}
          onFormSubmit={(formData) => updateItem(formData)}
        />
      )}
      {selectedSchedulePiece && (
        <DeleteConfirmationModal
          id='delete'
          itemToDeleteName={selectedSchedulePiece.name}
          onDeleteClick={() => deleteItem()}
        />
      )}
      <SchedulePieceAddModal
        id='add'
        onFormSubmit={(formData) => addItem(formData)}
      />
    </>
  );
};

export default SchedulePieces;
