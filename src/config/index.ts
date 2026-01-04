export * from './api.config';
export * from './route.paths';


export const config = { 
  callbackUrlName: 'next',
  localStorageSavingDuration: 1000, // 1 seconds
  evalutionOffsetLimit: 20,
  simulationOffsetLimit: 20,
  token: {
    tokenSecret: 'craftxr-secret-key-for-tokens',
    accessTokenName: 'accessToken',
    refreshTokenName: 'refreshToken',
    accessTokenExpiry: 10 * 60 * 1000, // 10 mins in milliseconds
    // accessTokenExpiry: 10 * 30 * 1000, // 30 seconds in milliseconds
    refreshTokenExpiry: 4 * 60 * 60 * 1000, // 4 hours in milliseconds
  },
};


export const inputMaxLength = {
  avatar: {
    designation: 50
  },
  chat: {
    dialog: 500,
    intent: 50,
    topic: 50,
    segment: 250,
    breathing_style: 50,
    transition_action: 50,
    conv_id: 50
  },
  institute: {
    name: 50,
    alias: 10
  },
  school: {
    name: 50,
    alias: 10
  },
  department: {
    name: 50,
  },
  program: {
    name: 50,
    alias: 10
  },
  programAffiliation: {
    name: 10
  },
  scene: {
    floor_rows: 50,
    floor_column: 50,
    asset_name: 50,
    scene_description: 250
  },
  chatHistory: {
    dialog_rendered: 500
  },
  scenario: {
    name: 50,
    description: 500,
    overview: 500,
    related_details: 1000

  },
  simulation: {
    title: 50,
    objectives: 100,
  }
}