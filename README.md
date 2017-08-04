## Requirements
- **node.js** (tested on `v6.11.1`)
- **youtube-dl** (tested on `v2017.07.30.1`)
- **unix** (it will probably work on windows, but it's untested)

## Usage
`npm install -g youtube-backup`

or simply

`node lib`

## Vagrant
On the root path, you can run `vagrant up` to fire a clean `Centos 7` VM with a basic [Ansible](https://www.ansible.com/) provision.

If you `vagrant ssh`, it should work out of the box, and you will have a nice environment to use this.

But, as someone coding on windows and mac, I know that problems will happen.
Some are solved here (at this moment...), new will arise in the future for sure, the combination of software versions, host OSs,
virtualization providers, shared folders... is a real madness.
As always, Google is your friend.

Some examples (mainly for my own future reference):

- `Centos 7` comes clean, no guest additions, so depending on the software you're using you need to manually install them in order to shared folders to work.
If you're using [VirtualBox](https://www.virtualbox.org/), `vagrant plugin install vagrant-vbguest` is a nice option.

- VirtualBox doesn't like symlinks on windows, so using `yarn` or `npm install` will fail. You need to add the param `--no-bin-links` in order to work.

- Probably related with the above, `npm test` will fail on windows because it can't find `eslint` on the path. You'd want to `npm install -g eslint` on guest.

- Line endings! CRLF/LF!! just commit a `.gitaatributes` file and enforce it at repo level (https://help.github.com/articles/dealing-with-line-endings).

[![Build Status](https://travis-ci.org/ferjgar/youtube-backup.svg?branch=master)](https://travis-ci.org/ferjgar/youtube-backup)
