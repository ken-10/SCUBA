import React from 'react';
import { DataTableOne } from '/imports/api/data/dataTableOne';
import { DataTableTwo } from '/imports/api/data/dataTableTwo';
import { DataTableThree } from '/imports/api/data/dataTableThree';
import { Grid, Header, Container, Form, Loader } from 'semantic-ui-react';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const _ = require('underscore');

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.state = {
      depth: '',
      time: '',
      pressureGroup1: '',
      pressureGroup2: '',
      plannedSI: '',
      RNT: '',
      actualBT: '',
      totalBT: '',
    };
    this.updateState = this.updateState.bind(this);
    this.calculate = this.calculate.bind(this);
    this.submit = this.submit.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
    this.submitDive = this.submitDive.bind(this);
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  updateState(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** On submit, insert the data. */
  submitDive() {

  }

  calculate() {
    if (!(this.state.time === '' && this.state.depth === '')) {
      this.setState({
        pressureGroup1: this.props.one[this.state.depth][this.state.time],
      });
      if (!(this.state.plannedSI === '')) {
        this.setState({
          pressureGroup2: this.props.two[this.state.pressureGroup1][this.state.plannedSI],
        });
        const arr = this.props.three[this.state.pressureGroup2][this.state.depth];
        if (arr.length === 2) {
          this.setState({
            RNT: arr[0],
            actualBT: arr[1],
          });
        } else {
          this.setState({
            RNT: arr[0],
            actualBT: 0,
          });
        }
        this.setState({
          totalBT: this.state.RNT + this.state.actualBT,
        });
      }
    }
  }

  renderComponent() {
    let i = -1;
    const dropdownOne = _.map(_.without(_.keys(this.props.one), '_id'), function (val) {
      i++;
      return {
        key: i,
        text: val,
        value: val,
      };
    });
    i = -1;
    const dropdownTwo = _.map(_.keys(this.props.one[this.state.depth]), function (val) {
      i++;
      return {
        key: i,
        text: val,
        value: val,
      };
    });
    i = -1;
    const dropdownThree = _.map(_.keys(this.props.two[this.state.pressureGroup1]), function (val) {
      i++;
      return {
        key: i,
        text: val,
        value: val,
      };
    });
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Dive</Header>
                <h2 style={{ fontSize: 14 }}>Would you like to plan a dive?</h2>
                <Container style={{ paddingLeft: 20 }}>
                  <Form id='add-course' onSubmit={this.submitDive}>
                    <Form.Group>
                      <Form.Dropdown
                          fluid search selection
                          options={dropdownOne}
                          name={'depth'}
                          value={this.state.depth}
                          onChange={this.updateState}
                          onClick={this.calculate}
                          placeholder={'Select Depth (in feet)'}
                          style={{ minWidth: 150 }}
                      />
                      <Form.Dropdown
                          fluid search selection
                          options={dropdownTwo}
                          name={'time'}
                          value={this.state.time}
                          onChange={this.updateState}
                          onClick={this.calculate}
                          placeholder={'Select Time'}
                          style={{ minWidth: 150 }}
                      />
                      <Form.Dropdown
                          fluid search selection
                          options={dropdownThree}
                          name={'plannedSI'}
                          value={this.state.plannedSI}
                          onChange={this.updateState}
                          onClick={this.calculate}
                          placeholder={'Select Planned Surface Interval'}
                          style={{ minWidth: 150 }}
                      />
                      <Form.Button floated='right' color='blue' inverted icon='plus' />
                    </Form.Group>
                  </Form>
                </Container>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
          </Grid.Column>
        </Grid>
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

AddStuff.propTypes = {
  one: PropTypes.object.isRequired,
  two: PropTypes.object.isRequired,
  three: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('DataTableOne');
  const subscription2 = Meteor.subscribe('DataTableTwo');
  const subscription3 = Meteor.subscribe('DataTableThree');

  let tableOne = {};
  let tableTwo = {};
  let tableThree = {};
  if (subscription.ready() && subscription2.ready() && subscription3.ready()) {
    tableOne = DataTableOne.find({}).fetch();
    tableTwo = DataTableTwo.find({}).fetch();
    tableThree = DataTableThree.find({}).fetch();
  }

  return {
    // Returns the entire array, [0] since we want the object
    one: tableOne[0],
    two: tableTwo[0],
    three: tableThree[0],
    ready:
        subscription.ready() && subscription2.ready() && subscription3.ready()
  };
})(AddStuff);
