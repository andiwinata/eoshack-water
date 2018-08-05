import React from 'react';
import { compose, withState } from 'recompose';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ReadingInfo from './ReadingInfo';

const styles = theme => ({
  formButton: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
  cardsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '16px',
  },
});

const mockDeviceId = 1234;
const mockObj = {
  device_id: 'SGX1278989',
  geo_lat: 123.455,
  geo_lon: 111.333,
  timestamp: 1477849493,
  coliform_number: 2.8,
  ph_level: 9,
  chlorine_level: 8.4,
  turbidity: 12.3,
  water_ok: true,
}

const mockDeviceData = {
  [mockDeviceId]: Array.from({ length: 6 }, () => ({ ...mockObj })),
};

const DEVICE_ID_NAME = 'deviceID';

const DeviceData = ({ classes, currentData, setCurrentData }) => (
  <Formik
    onSubmit={(values, actions) => {
      setCurrentData(mockDeviceData[values[DEVICE_ID_NAME]]);
    }}
  >
    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
      <div className={classes.wrapper}>
        <form onSubmit={handleSubmit}>
          <TextField
            name={DEVICE_ID_NAME}
            label="Device ID"
            margin="normal"
            fullWidth
            onChange={handleChange}
            autoComplete="off"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.formButton}
            type="submit"
          >
            Show Device Readings
          </Button>
        </form>
        {currentData && (
          <div className={classes.cardsWrapper}>{currentData.map((data, id) => <ReadingInfo key={id} {...data} />)}</div>
        )}
      </div>
    )}
  </Formik>
);

export default compose(
  withState('currentData', 'setCurrentData', undefined),
  withStyles(styles)
)(DeviceData);
