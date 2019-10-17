import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='middle' container>
          <Grid.Column width={20} textAlign='left'>
            <h1>What are your diving plans for today?</h1>
            <form className="ui form">
              <div className="inline field">
                <label>Depth</label>
                <div className="ui input"><input type="text" placeholder="feet"/></div>
              </div>
            </form>
            <form className="ui form">
              <div className="inline field">
                <label>Time</label>
                <div className="ui input"><input type="text" placeholder="minutes"/></div>
              </div>
            </form>
            <form className="ui form">
              <div className="inline field">
                <label>Planned Surface Interval</label>
                <div className="ui input"><input type="text" placeholder="minutes"/></div>
              </div>
            </form>
            <button className="ui button">Submit</button>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Landing;
