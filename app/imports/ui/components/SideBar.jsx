import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Sidebar, Segment, Icon, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import { ROUTES } from '../../startup/client/route-constants';

/**
 * The NavBar appears at the top of every page. Rendered by the App Layout component.
 * @memberOf ui/components
 */
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render() {

    const isAdmin = this.props.currentUser && Roles.userIsInRole(Meteor.userId(), ROLE.ADMIN);
    const isDeveloper = this.props.currentUser && Roles.userIsInRole(Meteor.userId(), ROLE.DEVELOPER);
    console.log(isDeveloper);
    const menuStyle = { marginBottom: '10px' };

    const setVisible = (state) => {

      this.setState({ visible: state });
    };

    return (

        <Sidebar.Pushable as={Segment} style={{ margin: '0rem' }}>
          <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={() => setVisible(false)}
              vertical
              visible={this.props.visible}
              width='thin'
          >
            <Menu.Item as={NavLink} activeClassName="" exact to={ROUTES.LANDING}>
              <Header inverted as='h1'>HACC-Hui</Header>
            </Menu.Item>
            {isDeveloper ? (
                [<Menu.Item as={NavLink} activeClassName="active" exact
                            to={ROUTES.CREATE_TEAM} key='team-creation'>Create a Team</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact
                             to={ROUTES.DELETE_TEAM} key='delete-team'>Delete a Team</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact
                             to={ROUTES.TEAM_FINDER} key='team-finder'>Team Finder</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact
                             to={ROUTES.ALL_DEVELOPERS} key='all-developers'>All
                    Developers</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact
                             to={ROUTES.YOUR_TEAMS} key='your-teams'>Your Teams</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact
                             to={ROUTES.TEAM_INVITATIONS} key='team-invitations'>Your Team
                    Invitations</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact to={ROUTES.EDIT_PROFILE}
                             key='edit-profile'>Edit
                    Your Profile</Menu.Item>,
                ]
            ) : ''}
            {isAdmin ? (
                [
                  <Menu.Item as={NavLink} activeClassName="active" exact to={ROUTES.CONFIGURE_HACC}
                             key={ROUTES.CONFIGURE_HACC}>Configure HACC</Menu.Item>,
                  <Menu.Item as={NavLink} activeClassName="active" exact to={ROUTES.DUMP_DATABASE}
                             key={ROUTES.DUMP_DATABASE}>Dump Database</Menu.Item>,
                ]
            ) : ''}
            <Menu.Item>
              {this.props.currentUser === '' ? (
                  <Menu.Item as={NavLink} activeClassName="active" exact to={ROUTES.SIGN_IN}
                             key={ROUTES.SIGN_IN}>Sign In</Menu.Item>
              ) : (
                  <Menu.Item as={NavLink} activeClassName="active" exact to={ROUTES.SIGN_OUT}
                             key={ROUTES.SIGN_OUT}>Sign Out</Menu.Item>
              )}
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
  }
}

// Declare the types of all properties.
SideBar.propTypes = {
  currentUser: PropTypes.string,
  children: PropTypes.string,
  visible: PropTypes.bool,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const SideBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(SideBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(SideBarContainer);
