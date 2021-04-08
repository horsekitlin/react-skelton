PROJ_NAME=$1

npx create-react-app $PROJ_NAME
cd $PROJ_NAME
echo '{"compilerOptions": {"baseUrl": "src"},"include": ["src"]}' > jsconfig.json
rm -rf ./src
cp -a ../template/. ./src

../lastest/add_packages.sh

cd ..

rm -rf template lastest README.md 

mv ./$PROJ_NAME/admin/** .
mv ./$PROJ_NAME/admin/.* .

rmdir $PROJ_NAME
