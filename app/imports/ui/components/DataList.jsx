import React from "react";
import { Meteor } from "meteor/meteor";
import {
  Container,
  Header,
  Loader,
  Card,
  Button,
  Modal,
  Segment
} from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Profiles } from "/imports/api/profile/profile";
import DataCard from "/imports/ui/components/DataCard";

const _ = require("underscore");

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class DataList extends React.Component {
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

  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }

  renderCard(data) {
    const dives = data.plan;

    return _.map(dives, function(dive) {
      const pgi = dive.pgi;
      const depth = dive.depth;
      const pressureGroup1 = dive.pressureGroup1;
      const actualBT = dive.actualBT;
      const totalBT = dive.totalBT;
      const ipgi = dive.ipgi;
      const plannedSI = dive.plannedSI;
      const fpressure = dive.fpressure;

      return (
        <Container>
          <Segment padded>
            <DataCard
              pgi={pgi}
              depth={depth}
              pressureGroup1={pressureGroup1}
              actualBT={actualBT}
              totalBT={totalBT}
              ipgi={ipgi}
              plannedSI={plannedSI}
              fpressure={fpressure}
            />
          </Segment>
        </Container>
      );
    });
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">
          List of Planned Dives
        </Header>
        {this.props.profile.dives.length > 0 ? (
          _.map(this.props.profile.dives, plan => {
            return (
              <Modal
                closeIcon
                closeOnDimmerClick={false}
                trigger={
                  <Button>
                    <Header as="h3" textAlign="center">
                      {plan.date}
                    </Header>
                  </Button>
                }
              >
                <Modal.Header>{plan.date}</Modal.Header>
                <Modal.Content>
                  <Card.Group>{this.renderCard(plan)}</Card.Group>
                </Modal.Content>
              </Modal>
            );
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
