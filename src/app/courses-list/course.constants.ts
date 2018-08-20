enum Outline {
  fresh = 'success',
  upcoming = 'primary',
  default = 'secondary'
};

const freshCourseDaysLimit = 14;

const DEFAULT_COURSES_PER_PAGE = 10;

const Timeouts = {
  SEARCH_REQUEST_DEBOUNCE: 500
};

export {
  Outline,
  freshCourseDaysLimit,
  DEFAULT_COURSES_PER_PAGE,
  Timeouts
};
