import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
            defaultZoom={10}
            defaultCenter={{ lat: -33.309575, lng: 149.060731}}
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
        marks: [{lat: -33.308849, lng: 149.010766},{lat: -33.3062539, lng: 148.9739605},{lat: -33.295481, lng: 148.839921},]
    };

    getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }

    addMarker = e => {
        var gen_lat = this.getRandomInRange(-33.0, -33.5, 3)
        var gen_lon = this.getRandomInRange(149, 149.4, 3)
        var newPos = {lat: gen_lat, lng: gen_lon}

        this.setState({ marks: [...this.state.marks, ...[newPos] ] })

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
                  Show My Readings
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.formButton}
                  onClick={this.addMarker}
                  type="submit">
                  Add Location From Devices
                </Button>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  The Markers below show the areas of clean water or contaminated areas around you
                </Typography>
                <MapContainer
                    googleMapURL="http://maps.googleapis.com/maps/api/js?key=AIzaSyDZPmheqXofqkjMcimKOvEkGJhxWyhuaCg"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMapClick={this.addMarker}
                    marks={marks}
                />;
            </div>
        );
    }
}


export default withStyles(styles)(Map);
