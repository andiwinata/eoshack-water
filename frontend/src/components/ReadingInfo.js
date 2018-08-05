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
    width: 'calc(50% - 16px)',
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
      <Typography component="span">Latitude: {parseFloat(props.geo_lat).toFixed(2)}</Typography>
      <Typography component="span">Longitude: {parseFloat(props.geo_lon).toFixed(2)}</Typography>
      <Typography component="span">Timestamp: {new Date(props.timestamp).toLocaleDateString()}</Typography>
      <Typography component="span">Coliform Number: {parseFloat(props.coliform_number).toFixed(2)}</Typography>
      <Typography component="span">PH Level: {parseFloat(props.ph_level).toFixed(2)}</Typography>
      <Typography component="span">Chlorine Level: {parseFloat(props.chlorine_level).toFixed(2)}</Typography>
      <Typography component="span">Turbidity: {parseFloat(props.turbidity).toFixed(2)}</Typography>
    </CardContent>
  </Card>
);

export default withStyles(styles)(ReadingInfo);
