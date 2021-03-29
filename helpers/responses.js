const errResp = (message = 'Something went wrong!') => ({
  status: 'Failed',
  message,
});

const successResp = (data, message = '') => ({
  status: 'Success',
  data,
  message,
});

module.exports = { errResp, successResp };
