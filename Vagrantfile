Vagrant.require_version ">= 1.8.1"

Vagrant.configure("2") do |config|

  config.vm.box = "centos/7"

  config.vm.network :private_network, ip: "10.10.69.69"

	# to avoid "rsync could not be found" on windows 10 with this box
	config.vm.synced_folder ".", "/home/vagrant/sync", type: "virtualbox"

end
