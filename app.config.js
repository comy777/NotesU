import "dotenv/config"

module.exports = {
  name: 'notesU',
  version: '1.0.0',
  extra: {
    apiUrl: process.env.API_URL,
  },
  userInterfaceStyle: "automatic"
};