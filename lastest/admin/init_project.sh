#!/bin/bash
PROJ_NAME=$1

echo "initial vite react app"
npm create vite@9.3.4 $PROJ_NAME -- --template react --no-interactive --no-immediate
cd $PROJ_NAME

echo "create jsconfig.json"
echo '{"compilerOptions": {"baseUrl": "src"},"include": ["src"]}' > jsconfig.json

echo "刪除原本的 src 資料檔案"
rm -rf ./src

echo "複製樣板的 src"
mkdir src
cp -a ../template/admin/* ./src

echo "複製 vite 設定"
cp ../template/vite/vite.config.js .
rm -f public/icons.svg

echo "安裝需要的套件"
../lastest/admin/add_packages.sh

cd ..

echo "copy github action"
cp -a template/.github .

echo "copy envfile"
cp -a template/admin/.env.example .env
cp -a template/admin/.env.example .
echo "請編輯 .env 並填入實際的環境變數值"

echo "確保 .gitignore 排除 .env"
if ! grep -qx ".env" .gitignore 2>/dev/null; then
  echo ".env" >> .gitignore
fi

rm -rf template lastest README.md

shopt -s dotglob
mv ./$PROJ_NAME/* .
shopt -u dotglob

rmdir $PROJ_NAME
