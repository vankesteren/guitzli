#!/bin/bash
USERNAME=aaaa
PASSWD=bbbb
UPLOAD_URL=http://example.com/dav/

BIN32=out/make/*_i386.deb
BIN64=out/make/*_amd64.deb
TARGET32=Guitzli_setup_32.deb
TARGET64=Guitzli_setup_64.deb

echo uploading 32bit binary
curl -u $USERNAME:$PASSWD -T $BIN32 "$UPLOAD_URL$TARGET32" 

echo uploading 64bit binary
curl -u $USERNAME:$PASSWD -T $BIN64 "$UPLOAD_URL$TARGET64"

echo upload complete