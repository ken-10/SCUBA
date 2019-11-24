import React from 'react';
import { Grid, Header, Transition, Image, Button, Container } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react/dist/commonjs/modules/Dropdown';
import { NavLink } from 'react-router-dom';

class DefaultLanding extends React.Component {
  state = { visible: true }

  toggleVisibility = () =>
      this.setState((prevState) => ({ visible: !prevState.visible }))

  render() {
     const { visible } = this.state;
     const style = {
       background: '#FBF1D4',
       paddingTop: '40px',
       paddingBottom: '40px',
       paddingLeft: '35px',
       paddingRight: '35px',

     };


    return (
        <div className="landing-page" onLoad= 'toggleVisibility();'>
          <div className="landing-section-1">
          <Grid verticalAlign='left' textAlign='left' style={{ margin: '0' }}>
            <Grid.Row columns={2} className="landing-panel-1">
                <Grid.Column width={8}>
                <Transition visible={visible} animation='scale' duration={500}>
                <Header as={'landing-header'}>Welcome to <br/></Header>
                </Transition>
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

          <Grid style={{ marginTop: '0' }} textAlign='center' >
            <Grid.Row columns={1} className="landing-panel-2" style={{ height: '40px' }}>
              <Grid.Column>
              <Header as={'landing-header3'}>
                <b>What is </b>
                <Header as={'landing-header-sub-3'}>
                  <b><i>my</i>Diver?</b></Header>
                <br/>
              </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1} style={{ height: '43px' }}>
              <div className="landing-divider">
                  <p>__________</p>
              </div>
            </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column width={8}>
                <p className="landing-text2"><i>my</i>Diver is an online dive table and journal. Below are some of our features listed:<br/>
                </p>
                </Grid.Column>
              </Grid.Row>
          </Grid>

          <Grid className="landing-cards">
            <Grid.Row className="landing-card-row" columns={3}>
              <Grid.Column width={4}>
                <a className="ui card" style={{ height: '400px', width: '250px' }}>
                  <div className="content" style={style}>
                    <Header as={'landing-card-header'}>Save <b>Time</b></Header>
                    <div className="description">
                      <br/>
                      Calculate all the times you need for your dive in minutes so you can dive as soon as possible.
                      <br/><br/><br/><br/>
                    </div>
                    <div className="card-img">
                    <Image height="70" width="70" src='/images/icon-alarm.png'/>
                    </div>
                  </div>
                </a>
              </Grid.Column>

              <Grid.Column width={4}>
                <a className="ui card" style={{ height: '400px', width: '250px' }}>
                  <div className="content" style={style}>
                    <Header as={'landing-card-header'}> <b>Easy</b> Interface</Header>
                    <div className="description">
                      <br/>
                      Log in and get planning. A simple interface for anyone to understand and use.<br/><br/><br/><br/>
                    </div>
                    <div className="card-img-2">
                      <Image width="75" height="75" src='/images/pointer.png'/>
                    </div>
                  </div>
                </a>
              </Grid.Column>

              <Grid.Column width={4}>
                <a className="ui card" style={{ height: '400px', width: '250px' }}>
                  <div className="content" style={style}>
                    <Header as={'landing-card-header'}> <b>Track</b> Dives</Header>
                    <div className="description">
                      <br/>
                      Customizable dive log that logs dives right after submission.<br/><br/><br/><br/>
                    </div>
                    <div className="card-img-3">
                      <Image width="75" height="75" src='/images/stats.png'/>
                    </div>
                  </div>
                </a>
              </Grid.Column>
            </Grid.Row>


          </Grid>
    </div>

    );
  }
}

export default DefaultLanding;
