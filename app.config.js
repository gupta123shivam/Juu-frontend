import 'dotenv/config'
export default ({ config }) => {
  return {
    ...config,
    name: 'newapp',
    version: process.env.MY_CUSTOM_PROJECT_VERSION || '1.0.0',
    // All values in extra will be passed to your app.
    //The "extra" key allows passing arbitrary configuration data to your app.
    // The value of this key is accessed using expo-constants:

    // import Constants from 'expo-constants';
    // Constants.expoConfig.extra.fact === 'kittens are cool';

    extra: {},
    expo: {
      jsEngine: 'hermes',
      android: {
        package: 'com.shivamgupta4891651.newapp',
      },

      extra: {
        jsEngine: 'hermes',
        eas: {
          projectId: '4f7f61d5-e107-4c17-b27f-7e388cbd2acf',
        },
      },
      updates: {
        url: 'https://u.expo.dev/4f7f61d5-e107-4c17-b27f-7e388cbd2acf',
      },
      runtimeVersion: {
        policy: 'sdkVersion',
      },
    },
  }
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
