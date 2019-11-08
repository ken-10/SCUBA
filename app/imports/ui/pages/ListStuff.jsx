import React from "react";
import { Meteor } from "meteor/meteor";
import { Container, Header, Loader, Card } from "semantic-ui-react";
import { Stuffs } from "/imports/api/stuff/stuff";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Profiles } from "/imports/api/profile/profile";
import DataCard from "/imports/ui/components/DataCard";

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStuff extends React.Component {
  constructor(props) {
    super(props);
    this.renderCard = this.renderCard.bind(this);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  renderCard(data, index) {
    const depth = data.depth;
    const time = data.time;
    const psi = data.plannedSI;
    const rnt = data.RNT;
    const abt = data.actualBT;
    const tbt = data.totalBT;

    return (
      <DataCard
        index={index}
        depth={depth}
        time={time}
        psi={psi}
        rnt={rnt}
        abt={abt}
        tbt={tbt}
      />
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const dives = _.map(this.props.profile.dives, (dive, index) => {
      return this.renderCard(dive, index);
    });

    return (
      <Container>
        <Header as="h2" textAlign="center">
          List Dives
        </Header>
        <Card.Group>{dives}</Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStuff.propTypes = {
  stuffs: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe("Stuff");
  const subscription2 = Meteor.subscribe("Profiles");

  let profile = {};
  if (subscription2.ready()) {
    profile = Profiles.findOne({ owner: Meteor.user().username });
  }

  return {
    stuffs: Stuffs.find({}).fetch(),
    profile: profile,
    ready: subscription.ready() && subscription2.ready()
  };
})(ListStuff);
