import "dotenv/config"

module.exports = {
  name: 'notesU',
  version: '1.0.0',
  extra: {
    apiUrl: process.env.API_URL,
    eas: {
      projectId: "562f057e-ce5b-4571-8033-20e94232fec8"
    }
  },
  userInterfaceStyle: "automatic",
  android: {
    package: "com.comy777.notesU",
  }
};