# youtube-backup

# setup
vagrant vxx
virtualbxo vxxx
ansible min v.2.1

# troubles
doing vagrant up you can get an error mounting the shared folders because the guest Centos OS doesnt have the VirtualBox Guest Additions installed
mount: unknown filesystem type 'vboxsf'
under some combinations (vagrant version, virtual box version, box version, etc..) it will just fail, is not going to mount the shared folder
to solve it you can you can use the plugin `vagrant plugin install vagrant-vbguest` to do the dirty job
