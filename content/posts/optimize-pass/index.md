---
title: Optimize pass for WSL, Ubuntu and Android
date: 2020-01-05
excerpt: Some tips to make better use of Pass
---

## Introduction

To manage my passwords, I use [pass](https://www.passwordstore.org/). An extension called [browserpass](https://github.com/browserpass/browserpass-native) allows filling the passwords by retrieving them from the store operated by pass. There is a Windows-compatible version, but as I am using WSL, I didn't want to have two copies of my password store (it would have been annoying to sync the two stores each time). Below are the steps that I've followed to make this works!

## WSL part

First, you have to install browserpass-native, the host that will communicate with the browser to exchange the pass. You can download the latest release from [here](https://github.com/browserpass/browserpass-native). I've extracted the file to `~/browserpass/`.

A passphrase protects my password store. To allow Windows to load the gpg-agent with the passphrase so it can access your password store, you have to configure a pinentry program. The following script called [pinentry-wsl-ps1](https://github.com/diablodale/pinentry-wsl-ps1) perfectly does the trick!

- Copy `pinentry-wsl-ps1.sh` somewhere.
- Give this read + execute rights (`chmod ug=rx pinentry-wsl-ps1.sh`)
- Create or edit `~/.gnupg/gpg-agent.conf` to add the following line:

```
pinentry-program /path/to/your/pinentry-wsl-ps1.sh

```

## Windows part

Download browserpass-native for Windows from [here](https://github.com/browserpass/browserpass-native). Run the .msi, and it will copy the appropriate files to `C:/Program Files/Browserpass` (It looks like nothing happened, check if the folder is created after the installation process).

- Create `browserpass-wsl.bat` to `C:/Program Files/Browserpass` with the following content:

```
@echo off
bash -c 'cd /your/home; ~/browserpass/browserpass-linux64'

```

- Update the `*-host.json`, which corresponds to your Browser (For Chrome/Brave, I've updated `chromimum-host.json`) and modify the path:

```
{
  ...
  "path": "C:\\Program Files\\Browserpass\\browserpass-wsl.bat"
  ...
}

```

- Install browserpass extension for your browser and enjoy!
