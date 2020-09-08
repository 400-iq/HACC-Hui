import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
  LongTextField,
} from 'uniforms-semantic';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { Challenges } from '../../api/challenge/ChallengeCollection';

// Create a schema to specify the structure of the data to appear in the form.
const schema = new SimpleSchema({
  title: String,
  interests: String,
  submissionDetail: String,
  pitch: String,
  description: String,
});

/**
 * Renders the Page for adding stuff. **deprecated**
 * @memberOf ui/pages
 */
class AddChallenge extends React.Component {

  /** On submit, insert the data.
   * @param data {Object} the results from the form.
   * @param formRef {FormRef} reference to the form.
   */
  submit(data, formRef) {

    console.log('AddChallenge.submit', data);

    const {
      title, description, interests, submissionDetail, pitch,
    } = data;

    const definitionData = {
      title, description, interests, submissionDetail, pitch,
    };

    const collectionName = Challenges.getCollectionName();
    console.log(collectionName);
    defineMethod.call({ collectionName: collectionName, definitionData: definitionData },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
            // console.error(error.message);
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            // console.log('Success');
          }
        });
    /*
    const docID = defineMethod.call({ collectionName: collectionName, definitionData: definitionData });
    console.log(docID);
     */
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const formSchema = new SimpleSchema2Bridge(schema);
    return (
        <div style={{ backgroundColor: '#C4C4C4' }}>
          <Grid container centered>
            <Grid.Column>
              <div style={{
                backgroundColor: '#393B44', padding: '1rem 0rem', margin: '2rem 0rem',
                borderRadius: '2rem',
              }}>
                <Header as="h2" textAlign="center" inverted>Add Challenge</Header>
              </div>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}
                        style={{
                          paddingBottom: '4rem',
                        }}>
                <Segment style={{
                  borderRadius: '1rem',
                  backgroundColor: '#393B44',
                }} className={'teamCreate'}>
                  <Grid container centered>
                    <Grid.Column style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>
                      <TextField name='title' required/>
                      <LongTextField name='description' required/>
                      <TextField name='interests' required/>
                      <TextField name='submissionDetail' required/>
                      <TextField name='pitch' required/>
                    </Grid.Column>
                  </Grid>
                  <div align='center'>
                    <SubmitField value='Submit'
                                 style={{
                                   color: 'white', backgroundColor: '#24252B',
                                   margin: '2rem 0rem',
                                 }}/>
                  </div>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default AddChallenge;