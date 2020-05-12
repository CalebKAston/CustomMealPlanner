import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { withRedux } from '../lib/redux';
import { actionTypes } from '../store';
import MeasurementViewModal from '../components/measurement-modals/view';
import MeasurementAddModal from '../components/measurement-modals/add';
import MeasurementUpdateModal from '../components/measurement-modals/update';
import DeleteConfirmationModal from '../components/shared-modals/delete-confirmation-modal';

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
  const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement>(
    measurements.length > 0 ? measurements[0] : null
  );

  const setSelectedMeasurementAndOpenModal = (measurement: Measurement) => {
    setSelectedMeasurement(measurement);
    $('#measurementModal').modal('show');
  };

  const filterFn = (item: Measurement) => {
    return nameFilter ? new RegExp(nameFilter, 'i').test(item.name) : true;
  };

  const openUpdateModal = () => {
    $('#measurementModal').modal('hide');
    $('#updateMeasurementModal').modal('show');
  };

  const updateMeasurement = (formData: MeasurementForm) => {
    dispatch({
      type: actionTypes.measurements.update,
      id: selectedMeasurement.id,
      measurement: formData,
    });
    $('#updateMeasurementModal').modal('hide');
  };

  const openAddModal = () => {
    $('#addMeasurementModal').modal('show');
  };

  const addMeasurement = (formData: MeasurementForm) => {
    dispatch({
      type: actionTypes.measurements.add,
      measurement: { ...formData, id: 10 },
    });
    $('#addMeasurementModal').modal('hide');
  };

  const openDeleteModal = () => {
    $('#measurementModal').modal('hide');
    $('#deleteMeasurementModal').modal('show');
  };

  const deleteMeasurement = () => {
    dispatch({
      type: actionTypes.measurements.remove,
      measurement: selectedMeasurement,
    });
    $('#measurementModal').modal('hide');
    $('#deleteMeasurementModal').modal('hide');
    setSelectedMeasurement(measurements.length > 0 ? measurements[0] : null);
  };

  return (
    <>
      <div className='row mb-3'>
        <div className='col-12'>
          <button
            className='btn btn-secondary w-100'
            type='button'
            data-toggle='collapse'
            data-target='#measurementFilter'
            aria-expanded='false'
            aria-controls='measurementFilter'
          >
            Filter
          </button>
        </div>
        <div className='col-12'>
          <div className='collapse border' id='measurementFilter'>
            <div className='col-6 pt-3'>
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
          </div>
        </div>
        <div className='col-12 mt-3'>
          <button
            className='btn btn-success w-100'
            onClick={() => openAddModal()}
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
              onClick={() => setSelectedMeasurementAndOpenModal(measurement)}
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
      {selectedMeasurement && (
        <MeasurementViewModal
          id='measurementModal'
          selectedMeasurement={selectedMeasurement}
          onDeleteClick={() => openDeleteModal()}
          onEditClick={() => openUpdateModal()}
        />
      )}
      {selectedMeasurement && (
        <MeasurementUpdateModal
          id='updateMeasurementModal'
          selectedMeasurement={selectedMeasurement}
          onFormSubmit={(formData) => updateMeasurement(formData)}
        />
      )}
      {selectedMeasurement && (
        <DeleteConfirmationModal
          id='deleteMeasurementModal'
          itemToDeleteName={selectedMeasurement.name}
          onDeleteClick={() => deleteMeasurement()}
        />
      )}
      <MeasurementAddModal
        id='addMeasurementModal'
        onFormSubmit={(formData) => addMeasurement(formData)}
      />
    </>
  );
};

export default withRedux(Measurements);
