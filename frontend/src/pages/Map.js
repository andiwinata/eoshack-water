import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
const styles = theme => ({
  formButton: {
    marginTop: theme.spacing.unit,
    width: "100%",
  }
});

const MapContainer = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={9}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
            onClick={e => props.onMapClick(e)}
        >
            {props.marks.map((mark, index) => (
                <Marker
                  position={mark}
                  key={index}
                  icon={icon}
                />
            ))}
        </GoogleMap>
    ))
);

class Map extends Component {
    state = {
        marks: []
    };

    addMarker = e => {
        this.setState({ marks: [...this.state.marks, e.latLng] });
        console.log(this.state.marks)
    };

    deleteMarkS = () => {
        this.setState({
            marks: []
        });
    };

    render() {
        const { marks } = this.state;
        const { classes } = this.props;
        return (
            <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.formButton}
              onClick={this.deleteMarkS}
              type="submit">
              Add My Device
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.formButton}
              onClick={this.deleteMarkS}
              type="submit">
              Load Locations
            </Button>
                <MapContainer
                    googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyDZPmheqXofqkjMcimKOvEkGJhxWyhuaCg"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMapClick={this.addMarker}
                    marks={marks}
                />;
            </div>
        );
    }
}


export default withStyles(styles)(Map);
