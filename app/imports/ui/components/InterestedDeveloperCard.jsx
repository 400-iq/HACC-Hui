import React from 'react';
import {
  Grid,
  Header,
  Item,
  Modal,
  Icon, Button, Popup,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class InterestedDeveloperCard extends React.Component {

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {

    function changeBackground(e) {
      e.currentTarget.style.backgroundColor = '#fafafa';
      e.currentTarget.style.cursor = 'pointer';
    }

    function onLeave(e) {
      e.currentTarget.style.backgroundColor = 'transparent';
    }

    return (
        <Item onMouseEnter={changeBackground} onMouseLeave={onLeave}
              style={{ padding: '0rem 2rem 0rem 2rem' }}>
          <Modal closeIcon trigger={
            <Item.Content>
              <Item.Header>
                <Header as={'h3'} style={{ color: '#263763', paddingTop: '2rem' }}>
                  <Icon name='user' size='tiny' />
                  {this.props.developers.firstName} {this.props.developers.lastName}
                </Header>
              </Item.Header>
              <Item.Meta>
                <Item.Meta>
                  <Grid doubling columns={5}>
                    <Grid.Column>
                      <Grid.Column floated={'left'} style={{ paddingBottom: '0.3rem' }}>
                        {this.props.challenges.map((challenge) => <p
                            style={{ color: 'rgb(89, 119, 199)' }}
                            key={challenge}>
                          {challenge}</p>)}
                      </Grid.Column>

                    </Grid.Column>
                    <Grid.Column>
                      <Header>Skills</Header>
                      {this.props.skills.map((skill) => <p key={skill}>
                        {skill.name}</p>)}
                    </Grid.Column>
                    <Grid.Column>
                      <Header>Tools</Header>
                      {this.props.tools.map((tool) => <p key={tool}>
                        {tool.name}</p>)}
                    </Grid.Column>
                    <Grid.Column>
                      <Header>Slack Username</Header>
                      {this.props.developers.username}
                    </Grid.Column>
                  </Grid>
                </Item.Meta>
              </Item.Meta>

            </Item.Content>
          }>
            <Modal.Header>{this.props.developers.firstName} {this.props.developers.lastName}</Modal.Header>
            <Modal.Content image scrolling>
              <Modal.Description>
                <Header>About Me</Header>
                <p>
                  {this.props.developers.aboutMe}
                </p>
                <Header>Slack Username</Header>
                <p>
                {this.props.developers.username}
                </p>
                <Header>LinkedIn</Header>
                <p>
                  {this.props.developers.linkedIn}
                </p>
                <Header>GitHub</Header>
                <p>
                  {this.props.developers.gitHub}
                </p>
                <Header>Website</Header>
                <p>
                  {this.props.developers.website}
                </p>
                <Header>Challenges</Header>
                <p>
                  {this.props.challenges.map((challenge) => <p key={challenge}>
                    {challenge}</p>)}
                </p>
                <Header>Skills</Header>
                <p>
                  {this.props.skills.map((skill) => <p key={skill}>
                    {skill.name}: {skill.level}</p>)}
                </p>
                <Header>Tools</Header>
                <p>
                  {this.props.tools.map((tool) => <p key={tool}>
                    {tool.name}: {tool.level}</p>)}
                </p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button style={{ backgroundColor: 'rgb(89, 119, 199)', color: 'white' }}>
                <Icon name='plus'/>
                Add member
              </Button>
            </Modal.Actions>
          </Modal>
          <Popup
              content='Added member!'
              mouseLeaveDelay={200}
              on='click'
              trigger={
                <Button style={{ backgroundColor: 'transparent' }}>
                  Add member
                </Button>
              }
          />
        </Item>
    );
  }
}

InterestedDeveloperCard.propTypes = {
  teams: PropTypes.object.isRequired,
  skills: PropTypes.array.isRequired,
  tools: PropTypes.array.isRequired,
  challenges: PropTypes.array.isRequired,
  developers: PropTypes.object.isRequired,
};

export default InterestedDeveloperCard;