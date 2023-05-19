# Juu Mobile APp

# Preview

![../media/authflow.png](../media/authflow.png)

# Installation

1. Install [node.js](https://nodejs.org/en/)
2. Install Expo

   ```jsx
   npm install --global expo-cli
   ```

3. Download this repo
4. Install deps on your template folder

   ```jsx
   npm install
   ```

5. Start the environtment

   ```jsx
   expo start
   ```

## Auth Screens

- Login screen `./src/screens/auth/login.js`
- Register screen `./src/screens/auth/register.js`
- Forget password screen `./src/screens/auth/forget.js`

### React Navigation Auth Flow

The checking logged users process is inside `./src/provider/AuthProvider` I use React Context, you can add more functions like get the data of the user and store it to the context.

Inside the navigator `./src/navigation/AppNavigator.js`
There's 2 stack navigator :

- `<AuthSreens/>` → for not logged in users stack
- `<MainTabs/>` → for logged in users stack
- `<Loading/>` → when checking if the user is logged in or not loading screen

# Rapi UI

# File Managements

These are the folders and the functionality

```jsx
/src/assets -> for media such as images, etc
/src/components -> for components
/src/navigation -> for React Navigation
/src/context -> for React Context
/src/screens -> for Screens
```
