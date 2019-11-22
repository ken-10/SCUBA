import React from "react";
import { Meteor } from "meteor/meteor";
import { Container, Header, Loader } from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Profiles } from "/imports/api/profile/profile";
import DataCard from "/imports/ui/components/DataCard";

const _ = require("underscore");

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class DataList extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    function renderCard(data, index) {
      const depth = data.depth;
      const time = data.time;
      const psi = data.plannedSI;
      const rnt = data.RNT;
      const abt = data.actualBT;
      const tbt = data.totalBT;
      const pg1 = data.pressureGroup1;
      const pg2 = data.pressureGroup2;
      const date = data.date;

      return (
        <DataCard
          index={index}
          depth={depth}
          time={time}
          psi={psi}
          rnt={rnt}
          abt={abt}
          tbt={tbt}
          pg1={pg1}
          pg2={pg2}
          date={date}
        />
      );
    }

    return (
      <Container>
        <Header as="h2" textAlign="center">
          List of Planned Dives
        </Header>
        {this.props.profile.dives.length > 0 ? (
          _.map(this.props.profile.dives, (dive, index) => {
            return renderCard(dive, index);
          })
        ) : (
          <h3>No Dives Planned</h3>
        )}
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
DataList.propTypes = {
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe("Profiles");

  let profile = {};
  if (subscription.ready()) {
    profile = Profiles.findOne({ owner: Meteor.user().username });
  }

  return {
    profile: profile,
    ready: subscription.ready()
  };
})(DataList);
