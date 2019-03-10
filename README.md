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

### smartRead(filepath, options = { treatAs = null })

Read and parse file based on file extension. The following extensions are handled in order:

- `.json`: Loads file using [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).
- `.yml` and `yaml`: Loads file using [yaml-boost](https://github.com/blackflux/yaml-boost).
- `.js`: Loads file using [require](https://nodejs.org/api/modules.html#modules_require_id), but invalidating the cache before doing so.
- `.*`: Treats file as text file and loads as array of lines.

To ignore file extension and force treat the file as a certain type, you can pass the option `treatAs` as e.g. `json`.

## Important

Do not use this library for loading if you don't trust the source of the files you are loading!
