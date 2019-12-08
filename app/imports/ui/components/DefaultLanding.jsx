import React from 'react';
import { Grid, Header, Image, Button, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class DefaultLanding extends React.Component {

  render() {

    return (

        <div className="landing-page" onLoad='toggleVisibility();'>
          <Container>
          <div className="landing-section-1">
            <Grid verticalAlign='center' textAlign='left' style={{ margin: '0' }}>
              <Grid.Row columns={2} className="landing-panel-1">
                <Grid.Column width={8} className="panel-1-left">
                  <Header as={'landing-header'}>Welcome to <br/></Header>
                  <Header as={'landing-header2'}><i>my</i><b>DIVER</b><br/></Header>
                  <p className="landing-text">
                    <b>Less</b> time with tables, <b>More</b> time diving
                  </p>
                  <div className="landing-button">
                    <Button.Group>
                      <Button as={NavLink} exact to='/signup/'>Register Now</Button>
                    </Button.Group>
                  </div>
                </Grid.Column>

                <Grid.Column width={8} className="panel-1-2-left">
                  <div className="landing-img-1">
                    <Image height="350" width="350" src='/images/landing-scuba.svg'/>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Container>


          <Container>
            <div className="landing-section-2">
              <Grid verticalAlign='center' style={{ margin: '0' }}>
                <Grid.Row style={{ paddingBottom: 30 }}>
                  <Header as={'panel-2-header'} style={{ color: '#FBF1D4' }}>It's simple.</Header>
                </Grid.Row>
                <Grid.Row columns={2} className="landing-panel-2">
                  <Grid.Column className="panel-2-left" width={8} style={{ paddingRight: 10 }}>
                    <Header as="h2" style={{ color: 'white' }}>Save <b>Time</b></Header>
                    <div className="description" style={{ color: 'white' }}>
                      Calculate all the times you need for your dive in minutes so you can dive as soon as possible.
                    </div>
                    <Header as="h2" style={{ color: 'white' }}><b>Easy</b> Interface</Header>
                    <div className="description" style={{ color: 'white' }}>
                      Log in and get planning. A simple interface for anyone to understand and
                      use.
                    </div>
                    <Header as="h2" style={{ color: 'white' }}><b>Track</b> Dives</Header>
                    <div className="description" style={{ color: 'white' }}>
                      Logs dives right after submission.
                    </div>
                  </Grid.Column>
                  <Grid.Column width={8} style={{ paddingLeft: 10 }}>
                    <Image src="/images/planner-page.png"/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: 180 }}>
                    <Button as={NavLink} exact to='/signup/'>Get started for free</Button>
                </Grid.Row>
              </Grid>
            </div>
          </Container>
        </div>

  );
  }
  }

  export default DefaultLanding;
