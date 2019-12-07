import React from 'react';
import { Grid, Header, Card, Image, Button, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class DefaultLanding extends React.Component {

  render() {
    const style = {
      background: '#FBF1D4',
      paddingTop: '40px',
      paddingBottom: '40px',
      paddingLeft: '35px',
      paddingRight: '35px',

    };

    return (
        <div className="landing-page" onLoad='toggleVisibility();'>
          <div className="landing-section-1">
            <Grid verticalAlign='left' textAlign='left' style={{ margin: '0' }}>
              <Grid.Row columns={2} className="landing-panel-1">
                <Grid.Column width={8}>
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

                <Grid.Column width={8}>
                  <div className="landing-img-1">
                    <Image style={{ 'font-size': 171 }} avatar src='/images/landing-scuba.svg'/>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>


          <Container>
            <div className="landing-section-2">
              <Grid verticalAlign='center' textAlign='center' style={{ margin: '0' }}>
                <Grid.Row style={{ paddingBottom: 30 }}>
                  <Header as={'panel-2-header'} style={{ color: '#FBF1D4' }}>It's simple.</Header>
                </Grid.Row>
                <Grid.Row columns={3} className="landing-panel-2">
                  <Grid.Column width={5}>
                    <Header as="h2" style={{ color: 'white' }}>Save <b>Time</b></Header>
                    <Image src='/images/icon-alarm.png'/>
                    <div className="description" style={{ color: 'white' }}>
                      Calculate all the times you need for your dive in minutes so you can dive as soon as possible.
                    </div>
                  </Grid.Column>

                  <Grid.Column width={5}>
                    <Header as="h2" style={{ color: 'white' }}><b>Easy</b> Interface</Header>
                    <div className="description" style={{ color: 'white' }}>
                      Log in and get planning. A simple interface for anyone to understand and
                      use.
                    </div>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Header as="h2" style={{ color: 'white' }}><b>Track</b> Dives</Header>
                    <div className="description" style={{ color: 'white' }}>
                      Logs dives right after submission.
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Container>
        </div>

  );
  }
  }

  export default DefaultLanding;
