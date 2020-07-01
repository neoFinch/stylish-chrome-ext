# New Tab Chrome Extension

---
### Override New tab of chrome browser and manage your tasks, take notes. No more hassle of moving to different App to take notes.

### Following neumorphism design trend, UI is both new and sleek.
---

### Preview
<img src="https://i.imgur.com/pVeyuue.png" width="500px" alt="Preview"/>
<img src="https://i.imgur.com/vlTEgZN.png" width="500px" alt="Preview"/>


### How to use
---
It is still in development phase but here are the steps by which you can get it to work without downloading it from chrome extension marketplace.
1. After cloning the repo run command `npm install` and then `npm run build`. It will create a build folder and bundle all the files.
2. Copy content form the build folder mentioned above, make a new folder somewhere, name it anything (say 'new-ext') and paste all the contents in it.
3. Replace the content of manifest.json file (in newly created folder new-ext) with the content provided in sample-manifest.json (root directory of repo).
4. In your chrome browser go to `More Tools` > `Extensions`.
5. Click on the `Load Unpacked` button and choose the directory (new-ext).
6. That's it.

### Tools and lib used.
---
App is build with ReactJS using `create-react-app`.
`React-transition-group` is used for animations.

# Features!

  - Todo List
  - Notes
  - Time Tracker

