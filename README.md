# Safewallet Desktop App
Forked from SuperNET's Agama

#### For Developers
You must have `node.js` and `npm` installed on your machine.

Clone Safewallet Desktop App with FairExchange-GUI submodule
```shell
1) git clone https://github.com/fair-exchange/safewallet 
2) cd safewallet && cd gui/FairExchange-GUI/
3) npm install && npm install webpack
4) ./binary_artifacts.sh
5) npm start in project root folder
6) cd gui/FairExchange-GUI/react/src
7) npm start
8) toggle dev and debug options in settings
9) restart the app
10) sync safecoind and/or asset chains

You are ready to dev
```

### Important dev notes

#### Sockets.io
In dev mode backend is configured to send/receive messages from/to http://127.0.0.1:4000 address. If you open it as http://localhost:4000 sockets server will reject any messages.

#### Coin daemon binaries
Run binary_artifacts.sh from under safewallet folder you cloned previously. The script will fetch

#### For end users
The instructions to make production build of Safewallet App will be updated soon.

To build the production ready app, install `electron-packager` and `electron-prebuilt` packages from npm
```shell
sudo npm install electrum -g
npm install electron-packager -g
npm install electron-prebuilt -g
./buildscripts/fairexchange-build.sh
npm install -y .
./buildscripts/electron-build-windows.sh
```

#### **Dependencies for Ubuntu 16.0.4**
##### Wine1.8

```shell
sudo add-apt-repository ppa:ubuntu-wine/ppa
sudo apt-get update
sudo apt-get install wine1.8
```

#### **Alternative build SafeWallet through electron-builder**

#### Build SafeWallet
You must have `node.js (v7.10.1)` and `npm (4.2.0)` installed on your machine.
Dependencies `Wine1.8`
Clone Safewallet Desktop App with FairExchange-GUI submodule
```shell
1) git clone https://github.com/fair-exchange/safewallet 
2) cd safewallet
3) ./buildscripts/fairexchange-build.sh
4) npm install -y 
5)
```

##### Linux
#####
```shell
npm run dist-lin-deb
npm run dist-lin-tar
```

##### Windows
#####
```shell
npm run dist-win-exe
npm run dist-win-zip
```

##### MAC
#####
```shell
npm run dist-mac-zip
```

Finished build is saved to %HOME%/wallets/

#### **Build the Wallet-App**
Refer to the original [electron-packager](https://github.com/electron-userland/electron-packager) repository for more detailed information.

##### Linux
Change directory to iguana and execute the following command to build the Linux app
```shell
cd iguana
electron-packager . --platform=linux --arch=x64 --icon=assets/icons/safewallet_icons/128x128.png --out=build/ --buildVersion=VERSION_NUMBER_HERE --ignore=assets/bin/win64 --ignore=assets/bin/osx --overwrite
```
change architecture build parameter to ```--arch=x32``` for 32 bit build

##### OSX
Change directory to iguana and execute the following command to build the OSX app
```shell
cd iguana
electron-packager . --platform=darwin --arch=x64 --icon=assets/icons/safewallet_icons/safewallet_app_icon.icns --out=build/ --buildVersion=VERSION_NUMBER_HERE --ignore=assets/bin/win64 --ignore=assets/bin/linux64 --overwrite
```

##### Windows
Change directory to iguana and execute the following command to build the Windows app
```shell
dir iguana
electron-packager . --platform=win32 --arch=x64 --icon=assets/icons/safewallet_icons/safewallet_app_icon.ico --out=build/ --buildVersion=VERSION_NUMBER_HERE --ignore=assets/bin/osx --ignore=assets/bin/linux64 --overwrite

# If generating 32bit desktop package
electron-packager . --platform=win32 --arch=ia32 --icon=assets/icons/safewallet_icons/safewallet_app_icon.ico --out=build/ --buildVersion=VERSION_NUMBER_HERE --ignore=assets/bin/osx --ignore=assets/bin/linux64 --overwrite

# To build both x64 and x86 desktop package
electron-packager . --platform=win32 --arch=all --icon=assets/icons/safewallet_icons/safewallet_app_icon.ico --out=build/ --buildVersion=VERSION_NUMBER_HERE --ignore=assets/bin/osx --ignore=assets/bin/linux64 --overwrite
```
change architecture build parameter to ```--arch=x64``` for 64 bit build


## Troubleshooting Instructions

### Windows DLL issues
On Windows it's noticed iguana.exe complains about `VCRUNTIME140D.DLL` and `ucrtbased.dll` file.

Please see **windeps** directory and README file for instructions to install the required DLL files on Windows, and then try again running Safewallet App.

## Optional packages to make rpm and deb distros

electron-installer-debian

electron-installer-redhat

refer to ./make-deb.js and ./make-rpm.js
