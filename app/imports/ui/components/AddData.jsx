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
      depth: "",
      time: "",
      plannedSI: "",
      pressureGroup1: "",
      pressureGroup2: "",
      actualBT: "",
      totalBT: "",
      dropdownOne: [],
      dropdownTwo: [],
      dropdownThree: [],
      dropdownFour: [],
      dropdownFive: [],
      plan: [],
      input: true,
      input2: false,
      result: false,
      submitDisable: true
    };
    this.updateState = this.updateState.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
    this.calculatePG2 = this.calculatePG2.bind(this);
    this.submitDive = this.submitDive.bind(this);
    this.anotherDive = this.anotherDive.bind(this);
    this.planComplete = this.planComplete.bind(this);
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

    if (name === "pgi") {
      this.setState({
        ipgi: "",
        depth: "",
        time: "",
        plannedSI: "",
        pressureGroup1: "",
        pressureGroup2: "",
        actualBT: "",
        totalBT: "",
        submitDisable: true
      });
    }

    if (name === "depth") {
      this.setState({
        ipgi: "",
        time: "",
        plannedSI: "",
        pressureGroup1: "",
        pressureGroup2: "",
        actualBT: "",
        totalBT: "",
        submitDisable: true
      });
    }

    if (name === "actualBT") {
      this.setState({
        ipgi: "",
        plannedSI: "",
        pressureGroup2: "",
        totalBT: "",
        submitDisable: false
      });
      this.calculatePG2();
    }
  }

  /** On submit, insert the data. */
  calculatePG2() {
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
      ipgi: Session.get("pressureGroup2")
    });
  }

  submitDive() {
    const plannedSI = Session.get("plannedSI");
    const ipgi = this.state.ipgi;
    const fpressure = this.props.two[ipgi][plannedSI];
    const pgi = Session.get("pgi");
    const depth = Session.get("depth");
    const pressureGroup1 = Session.get("pressureGroup1");
    const actualBT = Session.get("actualBT");
    const totalBT = Session.get("totalBT");
    Session.set("fpressure", fpressure);
    this.clear();
    if (this.state.input2 === true) {
      this.setState({ input2: false, result: true });
    } else {
      this.setState({ input: false, result: true });
    }
    const dive = {
      pgi: pgi,
      depth: depth,
      pressureGroup1: pressureGroup1,
      actualBT: actualBT,
      totalBT: totalBT,
      ipgi: ipgi,
      plannedSI: plannedSI,
      fpressure: fpressure
    };
    let plan = this.state.plan;
    plan.push(dive);
    this.setState({
      plan: plan
    });
  }

  anotherDive() {
    const fpressure = Session.get("fpressure");
    this.setState({
      pgi: fpressure,
      input2: true,
      result: false
    });
    Session.set("pgi", fpressure);
  }

  planComplete() {
    const user = Profiles.find({}).fetch()[0];
    const dateObj = new Date();
    const date = dateObj.toLocaleString();
    const data = {
      date: date,
      plan: this.state.plan
    };
    Profiles.update(user._id, {
      $push: { dives: data }
    });
  }

  clear() {
    this.setState({
      pgi: "",
      ipgi: "",
      depth: "",
      time: "",
      plannedSI: "",
      pressureGroup1: "",
      pressureGroup2: "",
      actualBT: "",
      totalBT: "",
      dropdownOne: [],
      dropdownTwo: [],
      dropdownThree: [],
      dropdownFour: [],
      dropdownFive: [],
      submitDisable: true
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
    Session.setDefault("actualBT", "");
    Session.setDefault("totalBT", "");

    return (
      <Container className="planner-ui">
        <Card.Group centered itemsPerRow={4}>
          <Transition.Group>
            <Transition visible={this.state.input}>
              <Card className="initial-dive-card" style={{ background: '#475f6f' }}>
                <Header style={{ color: 'white' }} as="h2" textAlign="center">
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
                  <Button className="add-data-buttons"
                    style={{ paddingTop: 10 }}
                    floated="right"
                    color="#fbf1d4"
                    inverted
                    disabled={this.state.submitDisable}
                    onClick={this.submitDive}
                  >
                    Submit
                  </Button>
                  <Button
                    style={{ paddingTop: 10 }}
                    onClick={this.clear}
                    floated="right"
                    color="red"
                    inverted
                  >
                    Reset
                  </Button>
                </Form>
              </Card>
            </Transition>
            <Transition visible={this.state.input2}>
              <Card className="initial-dive-card" style={{ background: '#475f6f' }}>
                <Header as="h2" textAlign="center" style={{ color: 'white' }}>
                  Plan a Dive
                </Header>
                <Form>
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
                  <Button className="add-data-buttons"
                    style={{ paddingTop: 10 }}
                    floated="right"
                    inverted
                    disabled={this.state.submitDisable}
                    onClick={this.submitDive}
                  >
                    Submit
                  </Button>
                  <Button
                    style={{ paddingTop: 10 }}
                    onClick={this.clear}
                    floated="right"
                    color="red"
                    inverted
                  >
                    Reset
                  </Button>
                </Form>
              </Card>
            </Transition>
            <Transition visible={this.state.result}>
              <Card className="initial-dive-card" style={{ background: '#475f6f' }}>
                <Header as="h2" textAlign="center" style={{ color: 'white' }}>
                  Current Dive
                </Header>
                <h4>Starting Pressure Group: {Session.get("pgi")} </h4>
                <h4>Depth: {Session.get("depth")}</h4>
                <h4>Residual Nitrogen Time: {Session.get("pressureGroup1")}</h4>
                <h4>Actual Bottom Time: {Session.get("actualBT")}</h4>
                <h4>Total Bottom Time: {Session.get("totalBT")}</h4>
                <h4>Final Pressure Group: {Session.get("pressureGroup2")}</h4>
                <h4>Surface Interval: {Session.get("plannedSI")}</h4>
                <h4>Next Dive Pressure Group: {Session.get("fpressure")}</h4>
                <Button className="add-data-buttons"
                  style={{ paddingTop: 10 }}
                  floated="right"
                  inverted
                  onClick={this.anotherDive}
                >
                  Plan Another Dive
                </Button>
                <Button
                  style={{ paddingTop: 10 }}
                  floated="right"
                  color="red"
                  inverted
                  onClick={this.planComplete}
                >
                  Done
                </Button>
              </Card>
            </Transition>
          </Transition.Group>
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
      subscription4.ready() &&
      subscription5.ready()
  };
})(AddData);
