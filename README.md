# <span> <img src="https://raw.githubusercontent.com/vankesteren/guitzli/master/build/icon.png" width="5%"> </span> guitzli
[![GitHub release](https://img.shields.io/github/release/vankesteren/guitzli.svg)](https://github.com/vankesteren/guitzli/releases)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/vankesteren/blog/master/LICENSE)
[![GitHub commits](https://img.shields.io/github/commits-since/vankesteren/guitzli/v0.1.0.svg)](https://github.com/vankesteren/guitzli/commits/master)


## optimise jpg for web
Convert image files for web using google's [`guetzli`](https://github.com/google/guetzli) algorithm. This app is built on [`electron`](https://electron.atom.io/) with help from [`electron-forge`](https://beta.electronforge.io/). Also uses [`JQuery`](https://jquery.com/) and [`Bootstrap`](http://getbootstrap.com/) for the user interface.

![screenshot](https://raw.githubusercontent.com/vankesteren/guitzli/master/screenshot.png)

## When do I use it?
### The good
Guitzli uses [`guetzli`](https://github.com/google/guetzli) to compress your images to a fraction of their original size __without quality loss__. This is due to a [really interesting](https://arxiv.org/abs/1703.04421) human-visual-comparison algorithm developed by google. You're not convinced? Download the [before](https://raw.githubusercontent.com/vankesteren/guitzli/master/before.jpg) (8.62 MB) and [after](https://raw.githubusercontent.com/vankesteren/guitzli/master/after.jpg) (1.94 MB) photos from the above screenshot and compare them in as much detail as you want!

### The bad
__Guetzli conversion is slow__! Because of this, there are only a handful of web-related cases where guitzli is valuable:
1. You are serving an image with limited bandwith (e.g., self-hosting).
2. You are serving an image many times (e.g., a landing page).
3. You are adamant about having the absolute smallest file size.
4. Any combination of the above.

[Here](https://github.com/google/guetzli#using) you can find some more information on using guetzli (and thus guitzli!) from the people at google.

## How to install
Download the latest version for your system from [Releases](https://github.com/vankesteren/guitzli/releases). Only recent versions of windows are supported at this time. I'll try to support linux and osx as soon as possible!

For windows: install directory will be `%LOCALAPPDATA%\guitzli`. From there you can create a desktop shortcut should you so desire.


## How to build from source

1. Install [Node.js](https://nodejs.org/en/download/) 6.10.2.
2. Install electron-forge: `npm install -g electron-forge`

3. Clone, install, and start.
```bash
git clone https://github.com/vankesteren/guitzli.git
cd guitzli
npm install
npm start
```


## How to package and create binaries

It's simple: `electron-forge make` for your current architecture.
You can also specify another architecture by adding (for example) `--arch=ia32`.


# To-do

sooner: Proper packaging. Mac & Linux support.

later: Multi-image support. (batch processing & multi-core)
