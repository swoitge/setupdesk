#!/bin/bash

# install git
sudo apt-get update && sudo apt-get install -y git subversion curl
git config --global user.email "user"
git config --global user.name "user"

# atom
wget -qO - https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'
sudo apt-get update && sudo apt-get install -y atom
apm install svn
apm install rabbitvcs-svn

# keepass xc
sudo apt-get install -y keepassxc

# meteor
curl https://install.meteor.com/ | sh
