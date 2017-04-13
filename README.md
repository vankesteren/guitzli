<img src="https://raw.githubusercontent.com/vankesteren/guitzli/master/build/icon.png" width="20%"> 

# guitzli jpg converter
Convert image files for web using google's [`guetzli`](https://github.com/google/guetzli) algorithm. This app is built on [`electron`](https://electron.atom.io/) with help from [`electron-forge`](https://beta.electronforge.io/). Also uses [`JQuery`](https://jquery.com/) and [`Bootstrap`](http://getbootstrap.com/) for the user interface.

# How to install
Download the latest version for your system from [Releases](https://github.com/vankesteren/guitzli/releases)

For windows: install directory will be `C:\Users\<username>\AppData\Local\guitzli`. From there you can create a desktop shortcut should you so desire.


# How to build from source

1. Install [Node.js](https://nodejs.org/en/download/) 6.10.2

2. `git clone https://github.com/vankesteren/guitzli.git`

3. `npm install`

4. `npm start`

# How to package and create binaries

1. `npm install -g electron-forge`

2. `electron-forge make`
