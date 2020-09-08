import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the table. See pages/Listmenuitemss.jsx. */
class ToolAdminTable extends React.Component {

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.tools.name}</Table.Cell>
          <Table.Cell>{this.props.tools.description}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ToolAdminTable.propTypes = {
  tools: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */

export default withRouter(ToolAdminTable);