import React from 'react';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  header: {
    fontSize: '1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    width: 'calc(25% - 16px)',
    margin: '8px',
  },
  resultOk: {
    color: green[500],
  },
  resultNotOk: {
    color: red[500],
  },
});

const ReadingInfo = props => (
  <Card className={props.classes.card}>
    <CardContent>
      <Typography component="h3" className={props.classes.header}>
        Result:{' '}
        {props.water_ok ? (
          <Icon className={classnames(props.classes.resultOk, 'fas fa-check')} />
        ) : (
          <Icon className={classnames(props.classes.resultNotOk, 'fas fa-times')} />
        )}
      </Typography>
      <Typography component="span">Latitude: {props.geo_lat}</Typography>
      <Typography component="span">Longitude: {props.geo_lon}</Typography>
      <Typography component="span">Timestamp: {new Date(props.timestamp).toLocaleDateString()}</Typography>
      <Typography component="span">Coliform Number: {props.coliform_number}</Typography>
      <Typography component="span">PH Level: {props.ph_level}</Typography>
      <Typography component="span">Chlorine Level: {props.chlorine_level}</Typography>
      <Typography component="span">Turbidity: {props.turbidity}</Typography>
    </CardContent>
  </Card>
);

export default withStyles(styles)(ReadingInfo);
