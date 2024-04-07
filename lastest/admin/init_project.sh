PROJ_NAME=$1

echo "initial react app"
npx create-react-app $PROJ_NAME
cd $PROJ_NAME

echo "create jsconfig.json"
echo '{"compilerOptions": {"baseUrl": "src"},"include": ["src"]}' > jsconfig.json

echo "刪除原本的 src 資料檔案"
rm -rf ./src

echo "複製樣板的 src"
mkdir src
cp -a ../template/admin/* ./src

echo "安裝需要的套件"
../lastest/admin/add_packages.sh

cd ..

echo "copy github action"
cp -a template/.github .

echo "copy envfile"
cp -a template/admin/.env .
cp -a template/admin/.env.example .

rm -rf template lastest README.md 

mv ./$PROJ_NAME/** .
mv ./$PROJ_NAME/.* .

rmdir $PROJ_NAME
