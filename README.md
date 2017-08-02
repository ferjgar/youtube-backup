# Youtube Backup [![Build Status](https://travis-ci.org/ferjgar/youtube-backup.svg?branch=master)](https://travis-ci.org/ferjgar/youtube-backup)

## Setup
vagrant vxx
virtualbxo vxxx
ansible min v.2.1

## Usage
`node lib/index.js` (improve this...)

## Vagrant
doing vagrant up you can get an error mounting the shared folders because the guest Centos OS doesnt have the VirtualBox Guest Additions installed
mount: unknown filesystem type 'vboxsf'
under some combinations (vagrant version, virtual box version, box version, etc..) it will just fail, is not going to mount the shared folder
older versions of virtualbox coulnd inbstall automatically the VB guest additions if not found/are not updated
to solve it you can you can use the plugin `vagrant plugin install vagrant-vbguest` to do the dirty job

using yarn on windows over vagrant and a shared folder, it can´t use symlinks, so it may fail witjh something like
`EPROTO: protocol error, symlink '../acorn/bin/acorn' -> '/var/www/node_modules/acorn-jsx/node_modules/.bin/acorn'`
solution: use `yarn --no-bin-links`

line endings CRLF -> LF, nightmaare, you need to force it by local git congif or repo based witrh the file.gitaatributes
https://help.github.com/articles/dealing-with-line-endings/
