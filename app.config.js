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