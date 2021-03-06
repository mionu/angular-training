const AUTH_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  AUTH_ACTION_FAILED: 'AUTH_ACTION_FAILED',
  GET_USER_INFO: 'GET_USER_INFO',
  LOGOUT: 'LOGOUT'
}

const COURSES_ACTIONS = {
  GET_COURSES_LIST: 'GET_COURSES_LIST',
  COURSES_RECEIVED: 'COURSES_RECEIVED',
  DELETE_COURSE: 'DELETE_COURSE',
  COURSE_RECEIVED: 'COURSE_RECEIVED',
  GET_COURSE_BY_ID: 'GET_COURSE_BY_ID',
  UPDATE_COURSE: 'UPDATE_COURSE',
  CREATE_COURSE: 'CREATE_COURSE',
  COURSES_ACTION_FAILED: 'COURSES_ACTION_FAILED'
}

export {
  AUTH_ACTIONS,
  COURSES_ACTIONS
};
