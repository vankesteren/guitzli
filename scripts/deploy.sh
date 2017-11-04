#!/bin/bash
USERNAME=$1
PASSWD=$2
UPLOAD_URL=$3

#TARGET32=Guitzli_setup_32.deb
TARGET64=Guitzli_setup_64.deb

#echo uploading 32bit binary
#curl -u $USERNAME:$PASSWD -T out/make/*_i386.deb "$UPLOAD_URL$TARGET32" 

echo uploading 64bit binary
curl -u $USERNAME:$PASSWD -T out/make/*_amd64.deb "$UPLOAD_URL$TARGET64"

echo upload complete
