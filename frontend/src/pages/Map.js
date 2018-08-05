import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
const styles = theme => ({
  formButton: {
    marginTop: theme.spacing.unit,
    width: '100%',
  },
});

const MapContainer = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: -33.309575, lng: 149.060731 }} onClick={e => props.onMapClick(e)}>
      {props.marks.map((mark, index) => <Marker position={mark} key={index} icon={icon} />)}
    </GoogleMap>
  ))
);

class Map extends Component {
  render() {
    const { classes, marks } = this.props;
    return (
      <div>
        <MapContainer
          googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyDZPmheqXofqkjMcimKOvEkGJhxWyhuaCg"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          marks={marks}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Map);
