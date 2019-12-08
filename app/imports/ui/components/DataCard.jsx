import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Card, Loader } from "semantic-ui-react";
import { Profiles } from "/imports/api/profile/profile";

const _ = require("underscore");

class DataCard extends React.Component {
  render() {
    return this.props.ready ? (
      this.renderComponent()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  renderComponent() {
    return (
      <Card className="initial-dive-card" style={{ background: '#475f6f' }}>
        <h4>Starting Pressure Group: {this.props.pgi} </h4>
        <h4>Depth: {this.props.depth}</h4>
        <h4>Residual Nitrogen Time: {this.props.pressureGroup1}</h4>
        <h4>Actual Bottom Time: {this.props.actualBT}</h4>
        <h4>Total Bottom Time: {this.props.totalBT}</h4>
        <h4>Final Pressure Group: {this.props.ipgi}</h4>
        <h4>Surface Interval: {this.props.plannedSI}</h4>
        <h4>Next Dive Pressure Group: {this.props.fpressure}</h4>
      </Card>
    );
  }
}

DataCard.propTypes = {
  ready: PropTypes.bool.isRequired,
  pgi: PropTypes.string.isRequired,
  depth: PropTypes.string.isRequired,
  pressureGroup1: PropTypes.string.isRequired,
  actualBT: PropTypes.string.isRequired,
  totalBT: PropTypes.number.isRequired,
  ipgi: PropTypes.string.isRequired,
  plannedSI: PropTypes.string.isRequired,
  fpressure: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired
};

export default withTracker(() => {
  const subscription = Meteor.subscribe("Profiles");
  let profile = {};
  if (subscription.ready()) {
    profile = Profiles.findOne({ owner: Meteor.user().username });
  }

  return {
    profile: profile,
    ready: subscription.ready()
  };
})(DataCard);
