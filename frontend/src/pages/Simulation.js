import React from 'react';
import { compose, withHandlers } from 'recompose';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs

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

const Simulation = ({ classes, getDeviceReading, pushDeviceReading, pushReadingsOnClick }) => (
  <div>
    <Paper className={classes.paper}>
      <Typography className={classes.header} component="h2">
        Device Simulation (DEMO only)
      </Typography>
      <Button color="secondary" variant="contained" onClick={pushDeviceReading}>
        Push device reading to blockchain
      </Button>
      <Button color="secondary" variant="contained" onClick={getDeviceReading}>
        Get device reading from blockchain
      </Button>
      <Button variant="contained" color="secondary" onClick={pushReadingsOnClick}>
        Get readings in my city {/* TODO work with blockchain */}
      </Button>
    </Paper>
  </div>
);

const mockDeviceId = 1234;
const mockObj = {
  device_id: 1234,
  geo_lat: 123.455,
  geo_lon: 111.333,
  timestamp: 1477849493,
  coliform_number: 2.8,
  ph_level: 9,
  chlorine_level: 8.4,
  turbidity: 12.3,
  water_ok: true,
};

const getRandomInRange = (from, to, fixed) => {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
};

const EOS = {
  async pushDeviceReading(data) {
    const eos = Eos({ keyProvider: '5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5' });
    const result = await eos.transaction({
      actions: [
        {
          account: 'notechainacc',
          name: 'create',
          authorization: [
            {
              actor: 'useraaaaaaaa',
              permission: 'active',
            },
          ],
          data,
        },
      ],
    });

    console.log(result);
  },
  async getDeviceData() {
    const eos = Eos();
    const result = await eos.getTableRows({
      json: true,
      code: 'notechainacc', // contract who owns the table
      scope: 'notechainacc', // scope of the table
      table: 'people', // name of the table as specified by the contract abi
      limit: 100,
    });

    console.log('retriving blockchain', result.rows);
    return result.rows;
  },
};

const enhance = compose(
  withHandlers({
    getDeviceReading: props => async () => {
      const rows = await EOS.getDeviceData();

      rows.forEach(row => {
        props.setDeviceData(row.deviceid, [...(props.deviceData[row.deviceid] || []), row]);
      });
    },
    pushDeviceReading: props => async () => {
      await EOS.pushDeviceReading({
        deviceid: 1234,
        geo_lat: 123.455,
        geo_lon: 111.333,
        timestamp: 1477849493,
        coliform_number: 2.8,
        ph_level: 9,
        chlorine_level: 8.4,
        turbidity: 12.3,
      });
      await EOS.pushDeviceReading({
        deviceid: 12345,
        geo_lat: -33.308849,
        geo_lon: 149.010766,
        timestamp: 1533463200,
        coliform_number: 0.0,
        ph_level: 7.5,
        chlorine_level: 0.5,
        turbidity: 3.7,
      });
    },
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
