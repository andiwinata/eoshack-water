import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
  header: {
    marginBottom: '32px',
    fontSize: '1.2rem',
  },
});

const Simulation = ({ classes }) => (
  <div>
    <Paper className={classes.paper}>
      <Typography className={classes.header} component="h2">
        Device Simulation (DEMO)
      </Typography>
      <Button color="primary" variant="contained">
        Simulate device reading
      </Button>
    </Paper>
  </div>
);

export default withStyles(styles)(Simulation);
