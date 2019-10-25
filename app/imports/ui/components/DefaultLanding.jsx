import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

class DefaultLanding extends React.Component {

  render() {
    return (
      <div className="landing-page">
      <Grid verticalAlign='middle' textAlign='center' style={{ margin: '0' }}>
        <Grid.Row columns={1} className="landing-panel-1">
        <Grid.Column width={8}>
          <Header as={'landing-header'}>Welcome to DIVER</Header>
          <p className="landing-text">
            DIVER provides an online dive planner to allow users to easily calculate their next diving trip. Looking at tables is now something of the past!
          </p>
        </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    );
  }
}

export default DefaultLanding;
