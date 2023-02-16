import Config from 'react-native-config';

export const BASE_URL =
  Config.API_BASE_URL || 'https://api-prod2.8to18.com/v1/';
export const API_TOKEN = Config.API_TOKEN || 'eEpxrP4gXA3Jkb2gxLsw';
export const SCHOOLS_API_URL = 'schools/';
export const TEAMS_API_URL = 'teams/';
export const IMAGES_API_URL = 'images/';
export const EVENTS_API_URL = 'events/';
export const NEWS_API_URL = 'bulletins/';
export const LOGIN_API_URL = 'control_panel_login/';
export const PUBLISH_EVENT_URL = 'event_results/';

/* url with parameters */
export const SCHOOL_DETAILS_API_URL = (schoolId: number) =>
  `schools/${schoolId}/`;

export const TEAM_DETAILS_API_URL = (teamID: number) => `teams/${teamID}/`;
