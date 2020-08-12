import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { withRedux } from '../lib/redux';
import { actionTypes } from '../store';
import MeasurementViewModal from '../components/measurement-modals/view';
import MeasurementAddModal from '../components/measurement-modals/add';
import MeasurementUpdateModal from '../components/measurement-modals/update';
import DeleteConfirmationModal from '../components/shared-modals/delete-confirmation-modal';
import {
  ExpandCollapseButton,
  ExpandCollapse,
} from '../components/expand-collapse';

export interface Measurement {
  name: string;
  display: string;
  fluidOunces?: number;
  weightOunces?: number;
  id: number;
}

export interface MeasurementForm {
  name: string;
  display: string;
  fluidOunces?: number;
  weightOunces?: number;
}

const CursorPointerDiv = styled.div`
  cursor: pointer;
`;

const DotlessList = styled.ul`
  list-style: none;
`;

const BoldedSpan = styled.span`
  font-weight: bold;
`;

const Measurements = () => {
  const dispatch = useDispatch();
  const [nameFilter, setNameFilter] = useState('');
  const measurements: Measurement[] = useSelector(
    (state) => state.measurements
  );
  const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement>();
  const [updating, setUpdating] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const filterFn = (item: Measurement) => {
    return nameFilter ? new RegExp(nameFilter, 'i').test(item.name) : true;
  };

  useEffect(() => {
    $('#modal').on('hidden.bs.modal', function (e) {
      setAdding(false);
      setUpdating(false);
      setDeleting(false);
      setSelectedMeasurement(null);
    });
  });

  const openModal = () => {
    $('#modal').modal('show');
  };

  const closeModal = () => {
    $('#modal').modal('hide');
  };

  const updateMeasurement = (formData: MeasurementForm) => {
    dispatch({
      type: actionTypes.measurements.update,
      id: selectedMeasurement.id,
      measurement: formData,
    });
    setUpdating(false);
    closeModal();
  };

  const addMeasurement = (formData: MeasurementForm) => {
    dispatch({
      type: actionTypes.measurements.add,
      measurement: { ...formData, id: 10 },
    });
    setAdding(false);
    closeModal();
  };

  const deleteMeasurement = () => {
    dispatch({
      type: actionTypes.measurements.remove,
      measurement: selectedMeasurement,
    });
    setDeleting(false);
    setSelectedMeasurement(null);
    closeModal();
  };

  return (
    <>
      <div className='row mb-3'>
        <div className='col-12'>
          <ExpandCollapseButton
            className='btn btn-secondary w-100'
            target='measurementFilter'
            defaultExpanded={false}
          >
            Filter
          </ExpandCollapseButton>
        </div>
        <div className='col-12'>
          <ExpandCollapse id='measurementFilter' border={true}>
            <div className='col-6'>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  className={`form-control`}
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  id='measurementsName'
                />
              </div>
            </div>
          </ExpandCollapse>
        </div>
        <div className='col-12 mt-3'>
          <button
            className='btn btn-success w-100'
            onClick={() => {
              setAdding(true);
              openModal();
            }}
          >
            Add New Measurement
          </button>
        </div>
      </div>
      <div className='row'>
        {measurements.length === 0 && (
          <div className='col-12 text-center'>
            No measurements available. Create one!
          </div>
        )}
        {measurements.filter(filterFn).map((measurement) => (
          <div className='col-4 mb-3' key={measurement.name}>
            <CursorPointerDiv
              className='card'
              onClick={() => {
                setSelectedMeasurement(measurement);
                openModal();
              }}
            >
              <div className='card-body'>
                <h5 className='card-title'>{measurement.name}</h5>
                <div className='card-text'>
                  <DotlessList className='m-0 p-0'>
                    <li>
                      <BoldedSpan>Display:</BoldedSpan> {measurement.display}
                    </li>
                    <li>
                      <BoldedSpan>Weight Ounces:</BoldedSpan>{' '}
                      {measurement.weightOunces || 'N/A'}
                    </li>
                    <li>
                      <BoldedSpan>Fluid Ounces:</BoldedSpan>{' '}
                      {measurement.fluidOunces || 'N/A'}
                    </li>
                  </DotlessList>
                </div>
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
            <MeasurementAddModal
              onFormSubmit={(formData) => addMeasurement(formData)}
            />
          )}
          {selectedMeasurement && !adding && !updating && !deleting && (
            <MeasurementViewModal
              selectedMeasurement={selectedMeasurement}
              onDeleteClick={() => setDeleting(true)}
              onEditClick={() => setUpdating(true)}
            />
          )}
          {selectedMeasurement && updating && (
            <MeasurementUpdateModal
              selectedMeasurement={selectedMeasurement}
              onFormSubmit={(formData) => updateMeasurement(formData)}
            />
          )}
          {selectedMeasurement && deleting && (
            <DeleteConfirmationModal
              itemToDeleteName={selectedMeasurement.name}
              onDeleteClick={() => deleteMeasurement()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default withRedux(Measurements);
