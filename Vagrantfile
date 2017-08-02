Vagrant.require_version ">= 1.8.1"

Vagrant.configure("2") do |config|

  config.vm.box = "centos/7"
  # at this moment, the default /vagrant shared folder will not sync by default between hosts on windows and virtualbox
  # so we need to setup a new one that magically should work as expected
  config.vm.synced_folder ".", "/var/www"

  # using local because ansible doesn't like windows, vagrant should do the job on guest
  # but a requirement is having enabled /vagrant, which as noted above, could be out of sync
  config.vm.provision "ansible_local" do |ansible|
    ansible.playbook = "playbook.yml"
    ansible.sudo = true
    ansible.verbose = true
  end

end
