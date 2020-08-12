import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actionTypes } from '../store';
import SchedulePieceAddModal from '../components/schedule-piece-modals/add';
import DeleteConfirmationModal from '../components/shared-modals/delete-confirmation-modal';
import SchedulePieceUpdateModal from '../components/schedule-piece-modals/update';
import SchedulePieceViewModal from '../components/schedule-piece-modals/view';
import { withRedux } from '../lib/redux';
import {
  ExpandCollapseButton,
  ExpandCollapse,
} from '../components/expand-collapse';

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
  const schedulePieces = useSelector((state) => state.schedulePieces);
  const [selectedSchedulePiece, setSelectedSchedulePiece] = useState<
    SchedulePiece
  >();
  const [updating, setUpdating] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const filterFn = (item: SchedulePiece) => {
    return nameFilter ? new RegExp(nameFilter, 'i').test(item.name) : true;
  };

  useEffect(() => {
    $('#modal').on('hidden.bs.modal', function (e) {
      setAdding(false);
      setUpdating(false);
      setDeleting(false);
      setSelectedSchedulePiece(null);
    });
  });

  const openModal = () => {
    $('#modal').modal('show');
  };

  const closeModal = () => {
    $('#modal').modal('hide');
  };

  const updateItem = (formData: SchedulePieceForm) => {
    dispatch({
      type: actionTypes.schedulePieces.update,
      id: selectedSchedulePiece.id,
      schedulePiece: formData,
    });
    setUpdating(false);
    closeModal();
  };

  const addItem = (formData: SchedulePieceForm) => {
    dispatch({
      type: actionTypes.schedulePieces.add,
      schedulePiece: { ...formData, id: 10 },
    });
    setAdding(false);
    closeModal();
  };

  const deleteItem = () => {
    dispatch({
      type: actionTypes.schedulePieces.remove,
      schedulePiece: selectedSchedulePiece,
    });
    setDeleting(false);
    setSelectedSchedulePiece(null);
    closeModal();
  };

  return (
    <>
      <div className='row mb-3'>
        <div className='col-12'>
          <ExpandCollapseButton
            className='btn btn-secondary w-100'
            target='filter'
            defaultExpanded={false}
          >
            Filter
          </ExpandCollapseButton>
        </div>
        <div className='col-12'>
          <ExpandCollapse id='filter' border={true}>
            <div className='col-6'>
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
          </ExpandCollapse>
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
            onClick={() => {
              setAdding(true);
              openModal();
            }}
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
              onClick={() => {
                setSelectedSchedulePiece(schedulePiece);
                openModal();
              }}
            >
              <div className='card-body'>
                <h5 className='card-title'>{schedulePiece.name}</h5>
                <div className='card-text'>No details to display</div>
              </div>
            </CursorPointerDiv>
          </div>
        ))}
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
            <SchedulePieceAddModal
              onFormSubmit={(formData) => addItem(formData)}
            />
          )}
          {selectedSchedulePiece && !adding && !updating && !deleting && (
            <SchedulePieceViewModal
              selectedSchedulePiece={selectedSchedulePiece}
              onDeleteClick={() => setDeleting(true)}
              onEditClick={() => setUpdating(true)}
            />
          )}
          {selectedSchedulePiece && updating && (
            <SchedulePieceUpdateModal
              selectedSchedulePiece={selectedSchedulePiece}
              onFormSubmit={(formData) => updateItem(formData)}
            />
          )}
          {selectedSchedulePiece && deleting && (
            <DeleteConfirmationModal
              itemToDeleteName={selectedSchedulePiece.name}
              onDeleteClick={() => deleteItem()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default withRedux(SchedulePieces);
