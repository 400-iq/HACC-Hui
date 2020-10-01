import React from 'react';
import {
  Grid,
  Header,
  Image,
  Item,
  Icon,
  Button, Modal, Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'lodash';
import SimpleSchema from 'simpl-schema';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
  ListField,
  ListItemField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Developers } from '../../api/user/DeveloperCollection';
import { Slugs } from '../../api/slug/SlugCollection';

const schema = new SimpleSchema({
  participants: {
    type: Array,
    minCount: 1,
  },
  'participants.$': {
    type: Object,
  },
  'participants.$.email': {
    type: String,
    min: 3,
  },

});

class YourTeamsCard extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  /** On submit, insert the data.
   * @param formData {Object} the results from the form.
   * @param formRef {FormRef} reference to the form.
   */
  // eslint-disable-next-line no-unused-vars
  submit(formData, formRef) {

    console.log('CreateTeam.submit', formData, this.props);

    const { participants } = formData;
    // console.log(participants);
    // console.log(participants[0]);
    // console.log(participants[0].email);

    const developerCollection = Developers.dumpAll().contents;

    const foundParticipants = [];
    const participantList = [];

    for (let i = 0; i < participants.length; i++) {
      participantList.push(participants[i].email);
      for (let j = 0; j < developerCollection.length; j++) {
        if (participants[i].email === developerCollection[j].username) {
          foundParticipants.push(participants[i].email);
        }
      }
    }

    const notFoundParticipants = _.difference(participantList, foundParticipants);
    console.log(foundParticipants);
    console.log(participantList);
    console.log('Not Found:', notFoundParticipants);

    if (_.uniq(participantList).length !== participantList.length) {
      swal('Error',
          'Sorry, it seems like you entered a duplicate email.\n\nPlease check again.',
          'error');
      return;
    }

    // If we cannot find a username email
    if (notFoundParticipants.length > 0) {
      swal('Error',
          `Sorry, we could not find user(s): \n${notFoundParticipants.join(', ')} \n\nPlease double check that their emails are inputted correctly and that they have registered with the HACC-HUI Slackbot.`,
          'error');
      return;
    }

    // const definitionData = {
    //   name,
    //   description,
    //   owner,
    //   open,
    //   image,
    //   challenges: challengesObj,
    //   skills: skillsObj,
    //   tools: toolsObj,
    // };
    // // console.log(collectionName, definitionData);
    // defineMethod.call({
    //       collectionName,
    //       definitionData,
    //     },
    //     (error) => {
    //       if (error) {
    //         swal('Error', error.message, 'error');
    //         // console.error(error.message);
    //       } else {
    //         swal('Success', 'Team created successfully', 'success');
    //         formRef.reset();
    //         //   console.log('Success');
    //       }
    //     });
    // console.log(docID);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const formSchema = new SimpleSchema2Bridge(schema);

    return (
        <Item style={{ padding: '0rem 2rem 0rem 2rem' }}>
          <Item.Content>
            <Item.Header>
              <Header as={'h3'} style={{ color: '#263763', paddingTop: '2rem' }}>
                <Icon name='users' size='tiny'/>
                {this.props.teams.name}
              </Header>
            </Item.Header>
            <Item.Meta>
              <Grid columns='equal'>
                <Grid.Column>
                  <Image src={this.props.teams.image} rounded size='large'/>
                </Grid.Column>
                <Grid.Column>
                  <Header>Members</Header>
                  {this.props.teamDevelopers.map((developer) => <p key={developer}>
                    {developer.firstName} {developer.lastName}</p>)}
                </Grid.Column>
              </Grid>
            </Item.Meta>
          </Item.Content>

          <Button id={this.props.teams._id} style={{ backgroundColor: 'transparent' }}>
            <Link to={`/interested-developers/${this.props.teams._id}`}>See interested
              developers</Link>
          </Button>
          <Modal
              closeIcon
              onClose={() => this.setState({ open: false })}
              onOpen={() => this.setState({ open: true })}
              open={this.state.open}
              trigger={
                <Button id={this.props.teams._id}
                        style={{ backgroundColor: 'transparent', color: '#4183C4' }}>
                  Invite Members
                </Button>
              }
          >
            <Modal.Content
                style={{
                  background: 'none',
                  padding: 0,
                }}>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema}
                        onSubmit={data => this.submit(data, fRef)}
              >
                <Segment style={{
                  borderRadius: '10px',
                }}>
                  <Grid columns={1} style={{ paddingTop: '20px' }}>
                    <Grid.Column style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                      <Header as="h2" textAlign="center">
                        Who would you like to invite to {this.props.teams.name}?
                      </Header>

                      <ListField name="participants" label={'Enter each participant\'s email'}>
                        <ListItemField name="$">
                          <TextField showInlineError
                                     name="email"
                                     label={'Email'}/>
                        </ListItemField>
                      </ListField>

                    </Grid.Column>
                  </Grid>
                  <div align='center'>
                    <Button
                        content="Invite"
                        labelPosition='right'
                        icon='checkmark'
                        positive
                        style={{ margin: '20px 0px' }}
                    />
                  </div>
                </Segment>
              </AutoForm>
            </Modal.Content>
          </Modal>

          <Button id={this.props.teams._id} style={{ backgroundColor: 'transparent' }}>
            <Link to={`/edit-team/${this.props.teams._id}`}>Edit Team</Link>
          </Button>
        </Item>
    );
  }
}

YourTeamsCard.propTypes = {
  teams: PropTypes.object.isRequired,
  teamDevelopers: PropTypes.object.isRequired,
};

export default YourTeamsCard;
