# smart-fs

[![Build Status](https://circleci.com/gh/blackflux/smart-fs.png?style=shield)](https://circleci.com/gh/blackflux/smart-fs)
[![Test Coverage](https://img.shields.io/coveralls/blackflux/smart-fs/master.svg)](https://coveralls.io/github/blackflux/smart-fs?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=blackflux/smart-fs)](https://dependabot.com)
[![Dependencies](https://david-dm.org/blackflux/smart-fs/status.svg)](https://david-dm.org/blackflux/smart-fs)
[![NPM](https://img.shields.io/npm/v/smart-fs.svg)](https://www.npmjs.com/package/smart-fs)
[![Downloads](https://img.shields.io/npm/dt/smart-fs.svg)](https://www.npmjs.com/package/smart-fs)
[![Semantic-Release](https://github.com/blackflux/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/blackflux/js-gardener/blob/master/assets/badge.svg)](https://github.com/blackflux/js-gardener)

Abstraction Layer for File Management.

## Getting Started

    $ npm install --save smart-fs

## Functions

### getExt(filename)

Get the file extension without the dot.

### ensureDir(dirname, options = {})

Create directory if it does not exist. No error is throw if the directory already exist.

Returns true if the directory was successfully created, false otherwise.
Options get passed into [fs.mkdirSync](https://nodejs.org/api/fs.html#fs_fs_mkdirsync_path_options) internally.

## Important

Do not use this library for loading if you don't trust the source of the files you are loading!
