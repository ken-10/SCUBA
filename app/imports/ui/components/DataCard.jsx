import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Card, Header, Grid, Modal, Loader, Button } from "semantic-ui-react";
import { Profiles } from "/imports/api/profile/profile";

const _ = require("underscore");

class DataCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
      card: false
    };
    this.delete = this.delete.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.card = this.card.bind(this);
  }

  delete() {
    const user = Profiles.find({}).fetch()[0];
    const dive = {
      depth: this.props.depth,
      time: this.props.time,
      plannedSI: this.props.psi,
      RNT: this.props.rnt,
      actualBT: this.props.abt,
      totalBT: this.props.tbt,
      pressureGroup1: this.props.pg1,
      pressureGroup2: this.props.pg2,
      date: this.props.date
    };
    let list = this.props.profile.dives;
    const index = _.findIndex(list, dive);
    list.splice(index, 1);
    Profiles.update(user._id, {
      $set: { dives: list }
    });
    this.deleteModal();
    this.card();
  }

  deleteModal() {
    this.setState({
      delete: !this.state.delete
    });
  }

  card() {
    this.setState({
      card: !this.state.card
    });
  }

  render() {
    return this.props.ready ? (
      this.renderComponent()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  renderComponent() {
    const style = {
      marginTop: "7px",
      marginBottom: "7px"
    };

    return (
      <div>
        <Card fluid={true} onClick={this.card} style={style}>
          <Card.Content>
            <Grid columns="equal" textAlign="center">
              <Grid.Row>
                <Grid.Column floated={"left"}>
                  <Header>{this.props.date}</Header>
                </Grid.Column>
                <Grid.Column width={12}>
                  <p>
                    Depth: &nbsp;
                    {this.props.depth} &nbsp; Time: &nbsp;
                    {this.props.time} &nbsp; Planned Surface Interval: &nbsp;
                    {this.props.psi}
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
        <Modal
          open={this.state.card}
          onClose={this.card}
          closeIcon
          closeOnDimmerClick={false}
        >
          <Modal.Header>Dive Result</Modal.Header>
          <Modal.Content>
            <Grid
              columns="equal"
              textAlign="center"
              celled="internally"
              verticalAlign="middle"
            >
              <Grid.Row>
                <Grid.Column textAlign={"right"}>Depth</Grid.Column>
                <Grid.Column>{this.props.depth}</Grid.Column>
                <Grid.Column textAlign={"right"}>Time</Grid.Column>
                <Grid.Column>{this.props.time}</Grid.Column>
                <Grid.Column textAlign={"right"}>
                  Planned Surface Interval
                </Grid.Column>
                <Grid.Column>{this.props.psi}</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign={"right"}>
                  Residual Nitrogen Time
                </Grid.Column>
                <Grid.Column>{this.props.rnt}</Grid.Column>
                <Grid.Column textAlign={"right"}>
                  Actual Bottom Time
                </Grid.Column>
                <Grid.Column>{this.props.abt}</Grid.Column>
                <Grid.Column textAlign={"right"}>Total Bottom Time</Grid.Column>
                <Grid.Column>{this.props.tbt}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.deleteModal} negative>
              Delete
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal open={this.state.delete}>
          <Modal.Header>Delete Dive</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this dive?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.deleteModal} negative>
              No
            </Button>
            <Button
              onClick={this.delete}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

DataCard.propTypes = {
  ready: PropTypes.bool.isRequired,
  depth: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  psi: PropTypes.string.isRequired,
  rnt: PropTypes.number.isRequired,
  abt: PropTypes.number.isRequired,
  tbt: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  pg1: PropTypes.string.isRequired,
  pg2: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
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
