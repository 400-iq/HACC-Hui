import React from 'react';
import Form, {  Grid } from 'semantic-ui-react';

class DeletionReason extends React.Component {
  render() {
    return (
        <div style={{ backgroundColor: '#C4C4C4' }}>
          <Grid container centered>
            <Form>
              <Form.Field>
                <label>Tell us why you're leaving!</label>
                <input />
              </Form.Field>
            </Form>
          </Grid>
        </div>
    );
  }
}

export default DeletionReason;