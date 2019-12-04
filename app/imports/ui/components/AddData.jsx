import React from "react";
import { DataTableOne } from "/imports/api/data/dataTableOne";
import { DataTableTwo } from "/imports/api/data/dataTableTwo";
import { DataTableThree } from "/imports/api/data/dataTableThree";
import { DataTablePGI } from "/imports/api/data/dataTablePGI";
import {
  Header,
  Container,
  Form,
  Loader,
  Card,
  Transition,
  Button
} from "semantic-ui-react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Profiles } from "/imports/api/profile/profile";
import { Session } from "meteor/session";

const _ = require("underscore");

/** Renders the Page for adding a document. */
class AddData extends React.Component {
  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.state = {
      pgi: "",
      ipgi: "",
      time: "",
      plannedSI: "",
      pressureGroup1: "",
      pressureGroup2: "",
      RNT: "",
      actualBT: "",
      totalBT: "",
      dropdownOne: [],
      dropdownTwo: [],
      dropdownThree: [],
      dropdownFour: [],
      dropdownFive: [],
      visible: true,
      result: true
    };
    this.updateState = this.updateState.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
    this.submitDive = this.submitDive.bind(this);
    this.submitSI = this.submitSI.bind(this);
    this.dropdownOne = this.dropdownOne.bind(this);
    this.dropdownTwo = this.dropdownTwo.bind(this);
    this.dropdownThree = this.dropdownThree.bind(this);
    this.dropdownFour = this.dropdownFour.bind(this);
    this.dropdownFive = this.dropdownFive.bind(this);
    this.clear = this.clear.bind(this);
  }

  updateState(e, { name, value }) {
    this.setState({ [name]: value });
    Session.set(name, value);
  }

  /** On submit, insert the data. */
  submitDive() {
    const depth = Session.get("depth");
    const pgi = Session.get("pgi");
    const pressureGroup1 = this.props.pgi[pgi][depth];
    Session.set("pressureGroup1", pressureGroup1);
    const actualBT = Session.get("actualBT");
    if (actualBT.search("-") === -1) {
      const totalBT = parseInt(pressureGroup1) + parseInt(actualBT);
      Session.set("totalBT", totalBT);
      if (this.props.one[depth][totalBT] === undefined) {
        let val = totalBT;
        const arr = this.props.one[depth];
        const keys = _.map(_.keys(arr), function(val) {
          if (val.search("-") === -1) {
            return parseInt(val);
          }
          const index = val.search("-");
          return parseInt(val.slice(index + 1), val.length - 1);
        });
        const min = _.min(keys);
        const max = _.max(keys);
        console.log(val);
        console.log(min);
        console.log(max);
        console.log(keys);
        if (val < min) {
          val = min;
        } else if (val > max) {
          val = max;
        } else {
          while (this.props.one[depth][val] === undefined) {
            val++;
          }
        }
        const pressureGroup2 = this.props.one[depth][val];
        Session.set("pressureGroup2", pressureGroup2);
      } else {
        const pressureGroup2 = this.props.one[depth][totalBT];
        Session.set("pressureGroup2", pressureGroup2);
      }
    } else {
      const index = actualBT.search("-");
      let a = parseInt(actualBT.slice(0, index)) + parseInt(pressureGroup1);
      let b =
        parseInt(actualBT.slice(index + 1, actualBT.length)) +
        parseInt(pressureGroup1);
      let totalBT = a + "-" + b;
      Session.set("totalBT", totalBT);
      if (this.props.one[depth][totalBT] === undefined) {
        let val = b;
        const arr = this.props.one[depth];
        const keys = _.map(_.keys(arr), function(val) {
          if (val.search("-") === -1) {
            return parseInt(val);
          }
          const index = val.search("-");
          return parseInt(val.slice(index + 1), val.length - 1);
        });
        const min = _.min(keys);
        const max = _.max(keys);
        if (val < min) {
          val = min;
        } else if (val > max) {
          val = max;
        } else {
          while (this.props.one[depth][val] === undefined) {
            val++;
          }
        }
        const pressureGroup2 = this.props.one[depth][val];
        Session.set("pressureGroup2", pressureGroup2);
      } else {
        const pressureGroup2 = this.props.one[depth][totalBT];
        Session.set("pressureGroup2", pressureGroup2);
      }
    }
    this.setState({
      visible: false
    });
    this.clear();
  }

  submitSI() {
    const plannedSI = Session.get("plannedSI");
    const ipgi = Session.get("ipgi");
    const fpressure = this.props.two[ipgi][plannedSI];
    Session.set("fpressure", fpressure);
    this.setState({
      result: false
    });
    this.clear();
  }

  clear() {
    this.setState({
      pgi: "",
      ipgi: "",
      time: "",
      plannedSI: "",
      pressureGroup1: "",
      pressureGroup2: "",
      RNT: "",
      actualBT: "",
      totalBT: "",
      dropdownOne: [],
      dropdownTwo: [],
      dropdownThree: [],
      dropdownFour: []
    });
  }

  dropdownOne() {
    let i = -1;
    const dropdownOne = _.map(
      _.without(_.keys(this.props.three), "_id"),
      function(val) {
        i++;
        return {
          key: i,
          text: val,
          value: val
        };
      }
    );
    this.setState({
      dropdownOne: dropdownOne
    });
  }

  dropdownTwo() {
    let i = -1;
    const dropdownTwo = _.map(
      _.keys(this.props.three[this.state.pgi]),
      function(val) {
        i++;
        return {
          key: i,
          text: val,
          value: val
        };
      }
    );
    this.setState({
      dropdownTwo: dropdownTwo
    });
  }

  dropdownThree() {
    let i = -1;
    const dropdownThree = _.map(
      _.without(_.keys(this.props.two), "_id"),
      function(val) {
        i++;
        return {
          key: i,
          text: val,
          value: val
        };
      }
    );
    this.setState({
      dropdownThree: dropdownThree
    });
  }

  dropdownFour() {
    let i = -1;
    const dropdownFour = _.map(
      _.keys(this.props.two[this.state.ipgi]),
      function(val) {
        i++;
        return {
          key: i,
          text: val,
          value: val
        };
      }
    );
    this.setState({
      dropdownFour: dropdownFour
    });
  }

  dropdownFive() {
    let i = -1;
    const dropdownFive = _.map(
      _.keys(this.props.one[this.state.depth]),
      function(val) {
        i++;
        return {
          key: i,
          text: val,
          value: val
        };
      }
    );
    this.setState({
      dropdownFive: dropdownFive
    });
  }

  renderComponent() {
    Session.setDefault("pgi", "");
    Session.setDefault("ipgi", "");
    Session.setDefault("depth", "");
    Session.setDefault("pressureGroup1", "");
    Session.setDefault("pressureGroup2", "");
    Session.setDefault("plannedSI", "");
    Session.setDefault("RNT", "");
    Session.setDefault("actualBT", "");
    Session.setDefault("totalBT", "");

    return (
      <Container className="planner-ui">
        <Card.Group centered>
          {/* <Transition.Group>
            <Transition
              visible={this.state.visible}
              animation="fade"
              duration={500}
            > */}
          <Card className="initial-dive-card">
            <Header as="h2" textAlign="center">
              Plan a Dive
            </Header>
            <Form>
              <h2 style={{ fontSize: 14 }}>Starting Pressure Group</h2>
              <Form.Dropdown
                fluid
                search
                selection
                options={this.state.dropdownOne}
                name={"pgi"}
                value={this.state.pgi}
                onChange={this.updateState}
                onClick={this.dropdownOne}
                placeholder={"Select Initial Pressure Group"}
                style={{ minWidth: 150 }}
              />
              <h2 style={{ fontSize: 14 }}>Planned Diving depth</h2>
              <Form.Dropdown
                fluid
                search
                selection
                options={this.state.dropdownTwo}
                name={"depth"}
                value={this.state.depth}
                onChange={this.updateState}
                onClick={this.dropdownTwo}
                placeholder={"Select Depth in Meters"}
                style={{ minWidth: 150 }}
              />
              <h2 style={{ fontSize: 14 }}>Planned Diving Time</h2>
              <Form.Dropdown
                fluid
                search
                selection
                options={this.state.dropdownFive}
                name={"actualBT"}
                value={this.state.actualBT}
                onChange={this.updateState}
                onClick={this.dropdownFive}
                placeholder={"Select Time in Minutes"}
                style={{ minWidth: 150 }}
              />
            </Form>
            <Form>
              <Button
                floated="right"
                color="blue"
                inverted
                onClick={this.submitDive}
              >
                {" "}
                Submit{" "}
              </Button>
              <Button onClick={this.clear} floated="right" color="red" inverted>
                {" "}
                Reset
              </Button>
            </Form>
          </Card>
          {/* </Transition> */}
          {/* <Transition
              visible={!this.state.visible}
              animation="fade"
              duration={500}
            > */}
          <Card>
            <Header as="h2" textAlign="center" style={{ paddingBottom: 25 }}>
              Add Another Dive
            </Header>
            <Form style={{ marginTop: 25 }}>
              <h2 style={{ fontSize: 14 }}>Initial Pressure Group</h2>
              <Form.Dropdown
                fluid
                search
                selection
                options={this.state.dropdownThree}
                name={"ipgi"}
                value={this.state.ipgi}
                onChange={this.updateState}
                onClick={this.dropdownThree}
                placeholder={"Select Initial Pressure Group"}
                style={{ minWidth: 150 }}
              />
              <h2 style={{ fontSize: 14 }}>Planned Surface Interval</h2>
              <Form.Dropdown
                fluid
                search
                selection
                options={this.state.dropdownFour}
                name={"plannedSI"}
                value={this.state.plannedSI}
                onChange={this.updateState}
                onClick={this.dropdownFour}
                placeholder={"Surface Interval"}
                style={{ minWidth: 150 }}
              />
            </Form>
            <Form>
              <Button
                floated="right"
                color="blue"
                inverted
                onClick={this.submitSI}
              >
                {" "}
                Submit{" "}
              </Button>
              <Button onClick={this.clear} floated="right" color="red" inverted>
                {" "}
                Reset
              </Button>
            </Form>
          </Card>
          {/* </Transition>
          </Transition.Group>
          <Transition.Group>
            <Transition
              visible={this.state.result}
              animation="fade"
              duration={500}
            > */}
          <Card style={{ padding: 20 }}>
            <Header as="h2" textAlign="center" style={{ paddingBottom: 25 }}>
              Results
            </Header>
            <h4> Starting Pressure Group: {Session.get("pgi")} </h4>
            <h4>Depth: {Session.get("depth")}</h4>
            <h4>Residual Nitrogen Time: {Session.get("pressureGroup1")}</h4>
            <h4>Actual Bottom Time: {Session.get("actualBT")}</h4>
            <h4>Total Bottom Time: {Session.get("totalBT")}</h4>
            <h4>Final Pressure Group: {Session.get("pressureGroup2")}</h4>
          </Card>
          {/* </Transition>
            <Transition
              visible={!this.state.result}
              animation="fade"
              duration={500}
            > */}
          <Card style={{ padding: 20 }}>
            <Header as="h2" textAlign="center" style={{ paddingBottom: 25 }}>
              Your Next Dive
            </Header>
            <Card.Meta>
              <span>
                The results of your next dive based on your next dives input
                parameters.
              </span>
            </Card.Meta>
            <h4>Starting Pressure Group: {Session.get("ipgi")} </h4>
            <h4>Surface Interval: {Session.get("plannedSI")}</h4>
            <h4>Final Pressure Group: {Session.get("fpressure")}</h4>
          </Card>
          {/* </Transition>
          </Transition.Group> */}
        </Card.Group>
      </Container>
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

AddData.propTypes = {
  one: PropTypes.object.isRequired,
  two: PropTypes.object.isRequired,
  three: PropTypes.object.isRequired,
  pgi: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired
};

export default withTracker(() => {
  const subscription = Meteor.subscribe("DataTableOne");
  const subscription2 = Meteor.subscribe("DataTableTwo");
  const subscription3 = Meteor.subscribe("DataTableThree");
  const subscription4 = Meteor.subscribe("DataTablePGI");
  const subscription5 = Meteor.subscribe("Profiles");

  let tableOne = {};
  let tableTwo = {};
  let tableThree = {};
  let tablePGI = {};
  let profile = {};
  if (
    subscription.ready() &&
    subscription2.ready() &&
    subscription3.ready() &&
    subscription4.ready() &&
    subscription5.ready()
  ) {
    tableOne = DataTableOne.find({}).fetch();
    tableTwo = DataTableTwo.find({}).fetch();
    tableThree = DataTableThree.find({}).fetch();
    tablePGI = DataTablePGI.find({}).fetch();
    profile = Profiles.findOne({ owner: Meteor.user().username });
  }

  return {
    // Returns the entire array, [0] since we want the object
    one: tableOne[0],
    two: tableTwo[0],
    three: tableThree[0],
    pgi: tablePGI[0],
    profile: profile,
    ready:
      subscription.ready() &&
      subscription2.ready() &&
      subscription3.ready() &&
      subscription4.ready()
  };
})(AddData);
