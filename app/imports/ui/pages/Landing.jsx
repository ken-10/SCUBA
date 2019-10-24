import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  render() {
    return (
        <div className='landing-background'>
          <Grid container stackable centered columns ={1}>
            <Grid.Column textAlign={'center'}>
              <Grid.Row className="title-main">
                <p className="main-text">
                  Welcome to Dive Planner!
                </p>
                <p className="sub-main-text">
                    Your online dive planner!
                </p>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
    );
  }


}

export default Landing;
