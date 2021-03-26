#!/bin/bash

# install git
sudo apt-get update && sudo apt-get install -y git subversion curl
git config --global user.email "user"
git config --global user.name "user"

#mongodb comapss
wget https://downloads.mongodb.com/compass/mongodb-compass_1.26.0_amd64.deb
sudo dpkg -i mongodb-compass_1.26.0_amd64.deb

# atom
sudo apt-get install -y rabbitvcs-cli rabbitvcs-nautilus
wget -qO - https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'
sudo apt-get update && sudo apt-get install -y atom
apm install svn
apm install rabbitvcs-svn
apm install atom-wrap-in-tag

# keepass xc
sudo apt-get install -y keepassxc

# dropbox
cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64" | tar xzf -
~/.dropbox-dist/dropboxd

# meteor
curl https://install.meteor.com/ | sh
