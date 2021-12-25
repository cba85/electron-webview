# Electron webview

This is a simple Electron application to create a webview.

Features:

- Responsive window
- Remember the window dimensions when reopening
- Menu & keyboard shortcuts for MacOs
- No title bar
- Home button
- Print function
- MacOS, Windows and Linux executable with an app icon
- DMG installer for Mac

![Electron webview](screenshot.png)

This Electron webview application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render website. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.
- `assets/` - Assets for the project (style, scripts, icons)
- `src/` - Sources folder:
  - `menu.js` : menu template customization
  - `view.js` : browser view usage
  - `window.js` : browser window customization

Note: check [the offical Electron quick start](https://www.electronjs.org/docs/tutorial/quick-start) if you need to learn the basics about Electron.

## Usage

To run this repository you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Install dependencies
$ npm install
# Run the app
$ npm start
```

## Electron 12+ update

- Since [remote](https://www.electronjs.org/docs/api/remote) module is deprecated since Electron 12, this boilerplate uses [@electron/remote](https://github.com/electron/remote).
- This boilerplate doesn't use `nodeIntegration` nor `nodeIntegrationInWorker` option in `BrowserWindow` anymore [as required for security reasons](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content) but uses a preload script instead. This is useful for the app print function. If you want to see print function using `nodeIntegration` option, [check this printing sample app](https://github.com/hokein/electron-sample-apps/tree/master/printing).

## Configuration

You just need to change the `src` attribute of the `webview` in `index.html` file to display the url you want in your webview.

Alternatively, it's also possible to just load an external URL:

```js
  // Comment
  //mainWindow.loadURL(`file://${__dirname}/index.html`); // Load custom html file with external content using webview tag

  // Uncomment
  mainWindow.loadURL("https://github.com"); // Load directly an URL if you don't need interface customization

   // Or uncomment if you prefer to use BrowserView:
  const view = require("./src/view");
  view.createBrowserView(mainWindow);
```

### Developer tools

You can show by default the developer tools by uncommenting in `main.js` file: `mainWindow.openDevTools();`.

### Title bar

You can hide the title bar of the app by setting `frame: false` or `titleBarStyle: 'hidden'` when creating the window in `main.js` in `mainWindow` variable.

If you keep displaying the topbar using `titleBarStyle: 'hidden'` setting, you would have to adjust the topbar style.

For example:

```css
#controls {
  padding-top: 1.5em;
}
```

### Window dimensions and responsive

This webview is responsive and supports live dimensions change of the window.
This webview remembers the window size you have before quitting the app to use it when you open it again.

If you want to change the window dimensions at the first start, change `width` and `height` in `main.js` file in `mainWindow` variable when creating the window.

### Menu and keyboard shortcuts

This webview integrates an Electron menu. It will also make standard keyboard shortcuts, like copy and paste, work on MacOS.

You can modify this menu in `src/menu.js` file.

### Topbar (home and print buttons)

A topbar to show buttons:

- "Home" button to come back to your app if your website has external links.
- "Print" button to print the current url displayed by the webview.

You can activate/deactivate this topbar (activate by default).

#### Deactivation

##### In `src/window.js`:

```js
// Comment
// preload: path.join(__dirname, "../preload.js"), // required for print function
```

##### In `index.html`:

```html
<!-- Comment -->
<!-- <link rel="stylesheet" href="assets/css/topbar.css" /> -->
<!-- <div id="controls">...</div> -->
<!-- <script src="assets/js/renderer.js"></script> -->

<!-- Uncomment -->
<link rel="stylesheet" href="assets/css/no-topbar.css" />
```

##### In `assets/js/renderer.js`:

```js
// Comment
//homeButton();
```

#### Activation

- Do the opposite of what you did in the activation chapter above.
- Don't forget to set the homepage of your app in the `data-home` attribute of `webview` in `index.html` file to make the "Home" button works.

```html
  <!-- Webview -->
  <webview
    id="webview"
    autosize="on"
    src="https://www.github.com"
    data-home="https://www.github.com"
  ></webview>
```

## Application

To create a MacOS, Windows and Linux executable with an app icon, follow these instructions.

### Electron app icon

For this we need a 1024x1024 png-icon, a .icns for macs and a .ico for windows. For Linux we only need the pngs.

- Create your app icon

- Go to [iConvert Icons](https://iconverticons.com/online/) and upload the PNG and the service will take care of creating the other icon-formats.

- Add your files in `assets/icons`: put the `.icns` file into the `mac` folder, the pngs in the png folder and the `.ico` file in the win folder.<br>Rename the `.icns` and `.ico` files in `icon`.

#### Mac

On Mac, the `.icns` icon converted with iConvert Icons doesn't work.

I recommend using [Image2icon](http://www.img2icnsapp.com), an awesome free app to create and personalize icons from your pictures, available on the Mac Store.

The `.icns` icon converted with Image2icon perfectly works on Mac.

### Electron packager

"[Electron Packager](https://github.com/electron-userland/electron-packager) is a command line tool and Node.js library that bundles Electron-based application source code with a renamed Electron executable and supporting files into folders ready for distribution."

#### Install Electron packager

```bash
# for use in npm scripts
$ npm install electron-packager --save-dev

# for use from cli
$ npm install electron-packager -g
```

#### Application name

Change the `productName` in `package.json`

#### Build MacOS, Windows and Linux package from the terminal

MacOS

```bash
$ electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
```

Windows

```bash
$ electron-packager . --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Electron Webview"
```

Linux (Ubuntu)

```bash
$ electron-packager . --overwrite --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds
```

#### Shortcuts

To make it easier to create new builds, scripts are added in `package.json`.

Now you can run:

```bash
$ npm run package-mac
```

```bash
$ npm run package-win
```

```bash
$ npm run package-linux
```

## Mac installer

To create a DMG installer for our Electron app we can use the [electron-installer-dmg](https://github.com/mongodb-js/electron-installer-dmg) package.

To create a DMG installer you first need to package the app as we saw in the Application chapter above.

### Install

```bash
# For use in npm scripts
$ npm install electron-installer-dmg --save-dev

# For use from cli
$ npm install electron-installer-dmg -g
```

### Create the DMG

```bash
$ electron-installer-dmg ./release-builds/Electron\ webview-darwin-x64/Electron\ webview.app electron-webview --out=release-builds --overwrite --icon=assets/icons/mac/icon.icns
```

An `electron-webview.dmg` file is now created in the `release-builds` folder.

### Shortcuts

To make it easier to create new DMG installer, a script is added in `package.json`.

Now you can run:

```bash
$ npm run create-installer-mac
```

## Source

Based on:

- [Electron Packager tutorial](https://www.christianengvall.se/electron-packager-tutorial/)
- [Browser](https://github.com/hokein/electron-sample-apps/tree/master/webview/browser)
- [Printing](https://github.com/hokein/electron-sample-apps/tree/master/printing)

## References

- [Electron - app](https://www.electronjs.org/docs/api/app)
- [Electron - BrowserWindow](https://www.electronjs.org/docs/api/browser-window#class-browserwindow)
- [Electron - Menu](https://www.electronjs.org/docs/api/menu)
- [Electron - webview Tag](https://www.electronjs.org/docs/api/webview-tag)
- [Electron quick start](https://www.electronjs.org/docs/tutorial/quick-start)

## License

[MIT](LICENSE.md)
