echo "Update submodules"
git submodule update --recursive --remote

echo "Making guetzli binaries"
make -C guetzli

echo "Copying guetzli binary to src directory"
cp guetzli/bin/Release/guetzli src/bin/guetzli_linux_x86-64

echo "Build and make electron debs"
npm run make64
