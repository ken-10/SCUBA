import React from 'react';
import { Grid, Header, Transition, Image } from 'semantic-ui-react';

class DefaultLanding extends React.Component {
  state = { visible: true }

  toggleVisibility = () =>
      this.setState((prevState) => ({ visible: !prevState.visible }))

  render() {
     const { visible } = this.state;

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
              </Grid.Column>
              <Grid.Column width={8}>
                <div className="landing-img-1">
                  <Image style={{ 'font-size': 171 }} avatar src='/images/landing-scuba.svg'/>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          </div>

          <Grid divided='vertically' textAlign='center' style={{ marginTop: '0' }}>
            <Grid.Row columns={1} className="landing-panel-2">
              <Grid.Column>
              <Header as={'landing-header3'}>
                What is <i>my</i>Diver?<br/>
              </Header>
              </Grid.Column>
            </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column width={8}>
                <p className="landing-text2"><i>my</i>Diver is an online dive table and journal. Below are some of our features listed:<br/>
                </p>
                </Grid.Column>
              </Grid.Row>

          </Grid>
        </div>

    );
  }
}

export default DefaultLanding;
