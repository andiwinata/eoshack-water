import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose, withState, withStateHandlers } from 'recompose';
import Paper from '@material-ui/core/Paper';
import DeviceData from '../components/DeviceData';
import Map from './Map.js';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Simulation from './Simulation';

const styles = theme => ({
  card: {
    margin: 20,
  },
  toolbar: {
    backgroundColor: '#272727',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: '70%',
    margin: '24px auto',
    '& > h2': {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
  },
  formButton: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
  pre: {
    background: '#ccc',
    padding: 10,
    marginBottom: 0,
  },
});

const InfoPage = ({ classes, deviceData, marks, setMarks }) => (
  <div>
    <AppBar position="static" className={classes.toolbar}>
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" />

        <Typography variant="title" color="inherit" className={classes.flex}>
          H2EOS | Measuring water quality with IOT and BlockChain
        </Typography>
      </Toolbar>
    </AppBar>
    <Paper className={classes.paper}>
      <Typography component="h2">Retrieve Device Readings</Typography>
      <DeviceData deviceData={deviceData} />
    </Paper>
    <Paper className={classes.paper}>
      <Map marks={marks} />
    </Paper>
    <Simulation setMarks={setMarks} />
  </div>
);


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

const enhance = compose(
  withStateHandlers(
    {
      deviceData: mockDeviceData,
      marks: [
        { lat: -33.308849, lng: 149.010766 },
        { lat: -33.3062539, lng: 148.9739605 },
        { lat: -33.295481, lng: 148.839921 },
      ],
    },
    {
      setDeviceData: state => (id, deviceData) => ({
        ...state.deviceData,
        [id]: deviceData,
      }),
      setMarks: state => newPositions => {
        return {
          marks: [...state.marks, ...newPositions],
        };
      },
    }
  ),
  withStyles(styles)
);

export default enhance(InfoPage);
