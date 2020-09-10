import React from 'react';
import { Form, Grid, Button, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class DeletionReason extends React.Component {
  render() {
    return (
        <div style={ {backgroundColor: '#C4C4C4' } }>
          <Grid container centered>
            <Grid.Column>
            <Form>
              <Form.TextArea label="Tell us why you're leaving!"/>
              <Button className="negative ui button" as={NavLink} exact to="/signout">Confirm Deletion</Button>
            </Form>
              </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default DeletionReason;