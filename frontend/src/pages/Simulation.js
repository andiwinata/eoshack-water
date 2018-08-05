import React from 'react';
import { compose, withHandlers } from 'recompose';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: '70%',
    margin: '24px auto',
    background: grey[200],
    '& > h2': {
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    '& > button': {
      display: 'block',
      '& + button': {
        marginTop: '16px',
      },
    },
  },
  header: {
    marginBottom: '32px',
    fontSize: '1.2rem',
  },
});

const Simulation = ({ classes, pushReadingsOnClick }) => (
  <div>
    <Paper className={classes.paper}>
      <Typography className={classes.header} component="h2">
        Device Simulation (DEMO only)
      </Typography>
      <Button color="secondary" variant="contained">
        Simulate device reading
      </Button>
      <Button variant="contained" color="secondary" onClick={pushReadingsOnClick}>
        Push readings in my city
      </Button>
    </Paper>
  </div>
);

const getRandomInRange = (from, to, fixed) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

const enhance = compose(
  withHandlers({
    pushReadingsOnClick: props => () => {
      var newPos = [
        { lat: getRandomInRange(-33.0, -33.5, 3), lng: getRandomInRange(149, 149.4, 3) },
        { lat: getRandomInRange(-33.0, -33.5, 3), lng: getRandomInRange(149, 149.4, 3) },
      ];

      props.setMarks(newPos);
    },
  }),
  withStyles(styles)
);

export default enhance(Simulation);
