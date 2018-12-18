echo Refreshing binaries from artifacts.ipv6admin.com
echo =========================================
echo Step: Removing old binaries
pwd
[ ! -d assets ] && \
  rm -rvf artifacts.tar.gz
  mkdir -p assets
cd assets
[ -d artifacts.ipv6admin.com ] && \
  echo Removing old artifacts. && \
  rm -rvf artifacts.ipv6admin.com
echo
echo Step: Cloning latest binaries for build
#wget --recursive --no-parent https://artifacts.ipv6admin.com/latest/
#v0.29.2
wget http://185.20.184.51/binary/artifacts.tar.gz
tar zxf artifacts.tar.gz
echo
rm -rvf artifacts.tar.gz
rm -rvf bin
echo
cd ..
echo =========================================
echo
pwd
echo =========================================
echo Step: Moving Windows binaries from artifacts to assets/bin/linux64/
#echo
mkdir assets/bin
rm assets/artifacts.ipv6admin.com/latest/linux/iguana
mv assets/artifacts.ipv6admin.com/latest/linux assets/bin/linux64/
echo
echo =========================================
echo Step: Finished Updating binaries from artifacts
echo
echo Step: Removing temp-dir binaries
rm -rvf assets/bin/win64
rm -rvf assets/bin/osx
rm -rvf assets/artifacts.ipv6admin.com
echo Step: Finished
