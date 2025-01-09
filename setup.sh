#!/bin/bash

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y ./google-chrome-stable_current_amd64.deb

# install snap
sudo apt-get update && sudo apt-get install -y snapd

# install git + subversion
sudo apt-get update && sudo apt-get install -y git subversion curl
git config --global user.email "user"
git config --global user.name "user"

# kubectl
sudo apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl

# gcloud sdk
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
sudo apt-get update && sudo apt-get install -y google-cloud-sdk

#mongodb comapss
wget https://downloads.mongodb.com/compass/mongodb-compass_1.45.0_amd64.deb
sudo dpkg -i mongodb-compass_1.45.0_amd64.deb

#vs code
sudo snap install code --classic

#project maintenance
wget -q https://raw.githubusercontent.com/swoitge/setupdesk/main/maintain-projects.js

# keepass xc
sudo apt-get install -y keepassxc

# dropbox
# cd ~ && wget -O - "https://www.dropbox.com/download?plat=lnx.x86_64" | tar xzf -
# ~/.dropbox-dist/dropboxd

# nodejs
sudo apt-get install -y nodejs build-essential

# meteor
curl https://install.meteor.com/ | sh
