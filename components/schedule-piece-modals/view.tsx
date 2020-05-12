import React from 'react';
import styled from 'styled-components';
import { SchedulePiece } from '../../pages/schedule-pieces';

interface SchedulePieceViewModalProps {
  id: string;
  selectedSchedulePiece: SchedulePiece;
  onDeleteClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onEditClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SchedulePieceViewModal = ({
  id,
  selectedSchedulePiece,
  onDeleteClick,
  onEditClick,
}: SchedulePieceViewModalProps) => {
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
              {selectedSchedulePiece.name}
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
          <div className='modal-body'>No details to display</div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-dismiss='modal'
            >
              Close
            </button>
            <button
              type='button'
              onClick={onDeleteClick}
              className='btn btn-danger'
            >
              Delete
            </button>
            <button
              type='button'
              onClick={onEditClick}
              className='btn btn-primary'
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePieceViewModal;
