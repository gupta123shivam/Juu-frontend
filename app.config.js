const myValue = 'new-app'

module.exports = {
  name: myValue,
  version: process.env.MY_CUSTOM_PROJECT_VERSION || '1.0.0',
  // All values in extra will be passed to your app.
  //The "extra" key allows passing arbitrary configuration data to your app.
  // The value of this key is accessed using expo-constants:

  // import Constants from 'expo-constants';
  // Constants.expoConfig.extra.fact === 'kittens are cool';

  extra: {
    fact: 'kittens are cool',
    apiUrl: process.env.API_URL,
  },
  expo: {
    jsEngine: 'hermes',
    android: {
      package: 'com.shivamgupta4891651.newapp',
    },
    extra: {
      eas: {
        projectId: '7f6902fa-42d0-4054-99a1-b5d3072aaba2',
      },
    },
  },
}

// module.exports = ({ config }) => {
//   console.log(config.name); // prints 'My App'
//   return {
//     ...config,
//   };
// };

// Switching configuration based on the environment
// module.exports = () => {
//   if (process.env.MY_ENVIRONMENT === 'production') {
//     return {
//       /* your production config */
//     };
//   } else {
//     return {
//       /* your development config */
//     };
//   }
// };
// MY_ENVIRONMENT=production eas update
// npx cross-env MY_ENVIRONMENT=production eas update
