import React from 'react';
import { withState } from 'recompose';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';

const mockDeviceId = 1234;

const mockDeviceData = {
  [mockDeviceId]: {
    device_id: 'SGX1278989',
    geo_lat: 123.455,
    geo_lon: 111.333,
    timestamp: 1477849493,
    coliform_number: 2.8,
    ph_level: 9,
    chlorine_level: 8.4,
    turbidity: 12.3,
  },
};

const DEVICE_ID_NAME = 'deviceID';

const DeviceData = ({ currentData, setCurrentData }) => (
  <Formik
    onSubmit={(values, actions) => {
      setCurrentData(mockDeviceData[values[DEVICE_ID_NAME]]);
    }}
  >
    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit}>
        <TextField name={DEVICE_ID_NAME} label="Device ID" margin="normal" fullWidth onChange={handleChange} />
        {currentData && JSON.stringify(currentData)}
      </form>
    )}
  </Formik>
);

export default withState('currentData', 'setCurrentData', undefined)(DeviceData);
