<img src="https://raw.githubusercontent.com/vankesteren/guitzli/master/build/icon.png" width="10%"> 

# guitzli jpg converter
[![GitHub release](https://img.shields.io/github/release/vankesteren/guitzli.svg)](https://github.com/vankesteren/guitzli/releases)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/vankesteren/blog/master/LICENSE)
[![GitHub commits](https://img.shields.io/github/commits-since/vankesteren/guitzli/v0.1.0.svg)](https://github.com/vankesteren/guitzli/commits/master)

Convert image files for web using google's [`guetzli`](https://github.com/google/guetzli) algorithm. This app is built on [`electron`](https://electron.atom.io/) with help from [`electron-forge`](https://beta.electronforge.io/). Also uses [`JQuery`](https://jquery.com/) and [`Bootstrap`](http://getbootstrap.com/) for the user interface.

![screenshot](screenshot.png)

# How to install
Download the latest version for your system from [Releases](https://github.com/vankesteren/guitzli/releases)

For windows: install directory will be `C:\Users\<username>\AppData\Local\guitzli`. From there you can create a desktop shortcut should you so desire.


# How to build from source

1. Install [Node.js](https://nodejs.org/en/download/) 6.10.2.
2. Install electron-forge: `npm install -g electron-forge`

3. Clone, install, and start.
```bash
git clone https://github.com/vankesteren/guitzli.git
cd guitzli
npm install
npm start
```



# How to package and create binaries

It's simple: `electron-forge make` for your current architecture.
You can also specify another architecture by adding (for example) `--arch=ia32`.
