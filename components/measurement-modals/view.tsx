import React from 'react';
import styled from 'styled-components';
import { Measurement } from '../../pages/measurements';

const DotlessList = styled.ul`
  list-style: none;
`;

const BoldedSpan = styled.span`
  font-weight: bold;
`;

interface MeasurementViewModalProps {
  selectedMeasurement: Measurement;
  onDeleteClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onEditClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MeasurementViewModal = ({
  selectedMeasurement,
  onDeleteClick,
  onEditClick,
}: MeasurementViewModalProps) => {
  return (
    <div className='modal-content'>
      <div className='modal-header'>
        <h5 className='modal-title' id='modalTitle'>
          {selectedMeasurement.name}
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
      <div className='modal-body'>
        <DotlessList className='m-0 p-0'>
          <li>
            <BoldedSpan>Display:</BoldedSpan> {selectedMeasurement.display}
          </li>
          <li>
            <BoldedSpan>Weight Ounces:</BoldedSpan>{' '}
            {selectedMeasurement.weightOunces || 'N/A'}
          </li>
          <li>
            <BoldedSpan>Fluid Ounces:</BoldedSpan>{' '}
            {selectedMeasurement.fluidOunces || 'N/A'}
          </li>
        </DotlessList>
      </div>
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
        <button type='button' onClick={onEditClick} className='btn btn-primary'>
          Edit
        </button>
      </div>
    </div>
  );
};

export default MeasurementViewModal;
