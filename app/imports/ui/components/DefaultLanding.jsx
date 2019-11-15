import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

class DefaultLanding extends React.Component {

  render() {
    return (

        <div className="landing-page">
          <Grid verticalAlign='left' textAlign='left' style={{ margin: '0' }}>
            <Grid.Row columns={1} className="landing-panel-1">
              <Grid.Column width={8}>
                <Header as={'landing-header'}>Welcome to <br/></Header>
                <Header as={'landing-header2'}><i>my</i><b>DIVER</b><br/></Header>
                <p className="landing-text">
                  <b>Less</b> time with tables, <b>More</b> time diving
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

    );
  }
}

export default DefaultLanding;
