import React from 'react';
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

export default withStyles(styles)(Simulation);
