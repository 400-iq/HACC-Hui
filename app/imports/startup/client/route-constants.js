/**
 * The defined routes for HACC-Hui
 * @type {{SIGN_IN: string,
 * UNDERAGE_PARTICIPATION: string, LANDING: string, AGE_CONSENT: string, PARTICIPATION: string}}
 */
export const ROUTES = {
  LANDING: '/',
  SIGN_IN: '/signin',
  SIGN_OUT: '/signout',
  AGE_CONSENT: '/age-consent',
  PARTICIPATION: '/participation',
  UNDERAGE_PARTICIPATION: '/under-participation',
  CREATE_PROFILE: '/create-profile',
  EDIT_PROFILE: '/edit-profile',
  CREATE_TEAM: '/create-team',
  EDIT_TEAM: '/edit-team',
  DELETE_TEAM: '/delete-team',
  LIST_TEAMS: '/list-teams',
  DELETE_ACCOUNT: '/delete-account',
  CONFIGURE_HACC: '/configure-hacc',
  ADD_CHALLENGE: '/add-challenge',
  ADD_SKILL: '/add-skill',
  ADD_TOOL: '/add-tool',
  TEAM_FINDER: '/team-finder',
  INTERESTED_DEVELOPERS: '/interested-developers/:_id',
  ALL_DEVELOPERS: '/all-developers',
  DUMP_DATABASE: '/dump-database',
  YOUR_TEAMS: '/your-teams',
  EDIT_CHALLENGE: '/edit-challenge/:_id',
  EDIT_TOOL: '/edit-tool/:_id',
  EDIT_SKILL: '/edit-skill/:_id',
  TEAM_INVITATIONS: '/team-invitations',
};
