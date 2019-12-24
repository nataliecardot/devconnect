import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Destructuring the props.alerts made available due to mapStateToProps below
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

// Now want to fetch alert state (array of alerts shown in state tab of Redux DevTools) -- map Redux state to prop in this component in order to have access to it
const mapStateToProps = state => ({
  // alerts is the arbitrary name for the prop to hold the state and use in this component. state.alert, alert corresponds to name in root reducer
  alerts: state.alert
});

// If had any actions to call, that would go second
export default connect(mapStateToProps)(Alert);
