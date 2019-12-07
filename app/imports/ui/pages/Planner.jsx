import React from "react";
import { Grid, Loader } from "semantic-ui-react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Profiles } from "/imports/api/profile/profile";
import DataList from "/imports/ui/components/DataList";
import AddData from "/imports/ui/components/AddData";

/** Renders the Page for adding a document. */
class Planner extends React.Component {
  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent() {
    return (
        <div className="planner">
      <Grid container centered>
        <Grid.Row className="add-data">
          <AddData />
        </Grid.Row>
        <Grid.Row className="data-list">
          <DataList />
        </Grid.Row>
      </Grid>
        </div>
    );
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return this.props.ready ? (
      this.renderComponent()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }
}

Planner.propTypes = {
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired
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
})(Planner);
