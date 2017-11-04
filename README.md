<p align="center">
  <img src="https://raw.githubusercontent.com/vankesteren/guitzli/master/build/icon.png" width="20%"></img>
  <h1 align="center">Guitzli</h1>
  <p align="center">
    <a href="https://ci.appveyor.com/project/vankesteren/guitzli"><img src="https://ci.appveyor.com/api/projects/status/24xoj95ytbf4kn0g?svg=true" alt="Appveyor Build"></a>
    <a href="https://travis-ci.org/vankesteren/guitzli"><img src="https://api.travis-ci.org/vankesteren/guitzli.svg?branch=master"></a>
    <a href="https://github.com/vankesteren/guitzli/releases"><img src="https://img.shields.io/github/release/vankesteren/guitzli.svg" alt="GitHub release"></a>
    <a href="https://raw.githubusercontent.com/vankesteren/blog/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-orange.svg" alt="GitHub license"></a>
  </p>
</p>
<br/>

## Optimise images for web
Convert image files for web using google's [`guetzli`](https://github.com/google/guetzli) algorithm. This app is built on [`electron`](https://electron.atom.io/) with help from [`electron-forge`](https://beta.electronforge.io/). Also uses [`JQuery`](https://jquery.com/) and [`Material Design Lite`](http://getmdl.io) for the user interface.

![screenshot](https://raw.githubusercontent.com/vankesteren/guitzli/master/screenshot.png)

## When do I use it?
### The good
Guitzli uses [`guetzli`](https://github.com/google/guetzli) to compress your images to a fraction of their original size __without visual quality loss__. This is due to a [really interesting](https://arxiv.org/abs/1703.04421) human-visual-comparison algorithm developed by google. You're not convinced? Download the [before](https://raw.githubusercontent.com/vankesteren/guitzli/master/before.jpg) (8.62 MB) and [after](https://raw.githubusercontent.com/vankesteren/guitzli/master/after.jpg) (1.94 MB) photos from the above screenshot and compare them in as much detail as you want!

### The bad
__Guetzli conversion is slow!__ Because of this, there are only a handful of web-related cases where guitzli is valuable:
1. You are serving an image with limited bandwith (e.g., self-hosting).
2. You are serving an image many times (e.g., a landing page).
3. You are adamant about having the absolute smallest file size.
4. Any combination of the above.

[Here](https://github.com/google/guetzli#using) you can find some more information on using guetzli from the people at google.

## How to install

### Windows
Download the latest version for your system from [Releases](https://github.com/vankesteren/guitzli/releases). Only recent versions of windows are supported at this time. I'll try to support linux and osx as soon as possible!
Install directory will be `%LOCALAPPDATA%\guitzli`. From there you can create a desktop shortcut should you so desire.

### Debian/Ubuntu Linux
```shell
# Optional cd to downloads
cd ~/Downloads
wget -O guitzli.deb "https://github.com/vankesteren/guitzli/releases/download/V0.3.0/guitzli_linux_64.deb"
sudo dpkg -i guitzli.deb
```

## How to build from source

1. Install [Node.js](https://nodejs.org/en/download/) 6.10.2.

2. On linux, also install `libgconf-2-4`.

3. Clone, install, and start.
```bash
git clone https://github.com/vankesteren/guitzli.git
cd guitzli
npm install
npm start
```


## How to package and create binaries

It's simple: `npm run make` for to generate 32-bit and 64 bit binaries for your current architecture. You can also build only one architecture: `npm run make32` or `npm run make64`.


# To-do

sooner: Proper packaging. Mac ~& Linux~ support.

later: Multi-image support. (batch processing & multi-core)
