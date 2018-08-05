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

const InfoPage = ({ classes, marks, setMarks }) => (
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
      <DeviceData />
    </Paper>
    <Paper className={classes.paper}>
      <Map marks={marks} />
    </Paper>
    <Simulation setMarks={setMarks} />
  </div>
);

const enhance = compose(
  withStateHandlers(
    {
      marks: [
        { lat: -33.308849, lng: 149.010766 },
        { lat: -33.3062539, lng: 148.9739605 },
        { lat: -33.295481, lng: 148.839921 },
      ],
    },
    {
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
