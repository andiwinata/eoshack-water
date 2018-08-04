import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  header: {
    fontSize: '1.2rem',
  },
  card: {
    width: '25%',
  },
});

const ReadingInfo = props => (
  <Card className={props.classes.card}>
    <CardContent>
      <Typography component="h2" className={props.classes.header}>
        Measurement result
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
