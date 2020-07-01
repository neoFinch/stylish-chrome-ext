# New Tab Chrome Extension

---
### Override New tab of chrome browser and manage your tasks, take notes. No more hassle of moving to different App to take notes.

### Following neumorphism design trend, UI is both new and sleek.
---

### Preview
<img src="https://i.imgur.com/pVeyuue.png" width="500px" alt="Preview"/>
<img src="https://i.imgur.com/vlTEgZN.png" width="500px" alt="Preview"/>


### Steps to make it work
---
It is still in development phase but here are the steps by which you can get it to work without downloading it from chrome extension marketplace.
1. After cloning the repo run command `npm install` and then `npm run build`. It will create a build folder and bundle all the files.
2. Copy content form the build folder mentioned above, make a new folder somewhere, name it anything (say 'new-ext') and paste all the contents in it.
3. Replace the content of manifest.json file (in newly created folder new-ext) with the content provided in sample-manifest.json (root directory of repo).
4. In your chrome browser go to `More Tools` > `Extensions`.
5. Click on the `Load Unpacked` button and choose the directory (new-ext).

## Available Scripts

In the project directory, you can run:

### `npm i or npm install`

Installs the project dependencies.

### `npm start`

Runs the app in the development mode.  
 Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
 You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
 See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
 It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
 Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies \(Webpack, Babel, ESLint, etc\) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting\#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



