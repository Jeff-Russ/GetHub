const { token } = require('./secrets.js');

exports.gh_api_options = {
  headers: {
    'user-agent': 'node.js',
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
  }
}


