#!/bin/bash
### Build script for SafeWallet application for Windows.
### Created by mmaxian, 3/2017
### Update by OleksandrBlack, 09/2018

[ -z $SAFEWALLET_VERSION ] && echo "SAFEWALLET_VERSION variable is not set." && exit 0
[ ! -d build ] && mkdir build

echo
echo "Build script for SafeWallet application for Windows."
echo "Preparing electron package $SAFEWALLET_VERSION"

echo "Build x86 version"
electron-packager . --platform=win32 \
  --arch=ia32 \
  --icon=assets/icons/safewallet_app_icon.ico \
  --out=build/ \
  --buildVersion=$SAFEWALLET_VERSION \
  --ignore=assets/bin/osx \
  --ignore=assets/bin/linux64 \
  --ignore=react/node_modules \
  --ignore=react/src \
  --ignore=react/www \
  --ignore=SafeWallet-win32-ia32.tar.bz2 \
  --ignore=SafeWallet-win32-x64.tar.bz2 \
  --overwrite \
  --version-string.CompanyName="SafeCoin" \
  --version-string.FileDescription="Safewallet" \
  --version-string.OriginalFilename="Safewallet" \
  --version-string.ProductName="Safewallet" \
  --version-string.InternalName="Safewallet" \
  --app-copyright="Copyright (C) 2018 SafeCoin. All rights reserved." \
  
  
echo
echo "Сreate archive SafeWallet-win32-ia32.tar.bz2"
tar -cvjf SafeWallet-win32-ia32.tar.bz2 build/SafeWallet-win32-ia32/*

echo
echo "Build x64 version"
electron-packager . --platform=win32 \
  --arch=x64 \
  --icon=assets/icons/safewallet_app_icon.ico \
  --out=build/ \
  --buildVersion=$SAFEWALLET_VERSION \
  --ignore=assets/bin/osx \
  --ignore=assets/bin/linux64 \
  --ignore=react/node_modules \
  --ignore=react/src \
  --ignore=react/www \
  --ignore=SafeWallet-win32-ia32.tar.bz2 \
  --ignore=SafeWallet-win32-x64.tar.bz2 \
  --overwrite \
  --version-string.CompanyName="SafeCoin" \
  --version-string.FileDescription="Safewallet" \
  --version-string.OriginalFilename="Safewallet" \
  --version-string.ProductName="Safewallet" \
  --version-string.InternalName="Safewallet" \
  --app-copyright="Copyright (C) 2018 SafeCoin. All rights reserved." \
  
 
echo
echo "Сreate archive SafeWallet-win32-x64.tar.bz2"
tar -cvjf SafeWallet-win32-x64.tar.bz2 build/SafeWallet-win32-x64/*
