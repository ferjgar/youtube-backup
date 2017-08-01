Vagrant.require_version ">= 1.8.1"

Vagrant.configure("2") do |config|

  config.vm.box = "centos/7"

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
    ansible.sudo = true
    ansible.verbose = true
  end

end
