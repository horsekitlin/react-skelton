#!/bin/bash

echo "Add redux..."
yarn add redux react-redux redux-saga

echo "Add router..."
yarn add react-router@6.3.0 react-router-dom@6.3.0

echo "Add UI element..."
yarn add @mui/icons-material@5.8.4 @mui/lab @mui/material @mui/system @mui/utils @tabler/icons@1.72.0 react-perfect-scrollbar@1.5.8 @emotion/react@11.9.3 @emotion/cache@11.9.3 @emotion/styled@11.9.3 react-apexcharts@1.4.0 material-ui-popup-state@4.0.1 

echo "Packages..."
yarn add flux-constants yup formik@2.2.9 apexcharts@3.35.3 framer-motion@6.3.16 react-device-detect@2.2.2 redux-persist axios

echo "Dev Packages..."
yarn add -D babel-plugin-root-import@6.6.0 @babel/core@7.12.10 @babel/runtime@7.12.5 babel-eslint@10.1.0 sass@1.53.0 eslint-config-prettier@8.5.0 @babel/eslint-parser@7.18.2 @babel/preset-react@7.18.6 eslint-plugin-prettier@4.2.1 eslint-plugin-react@7.30.1 eslint-plugin-react-hooks@4.6.0 eslint-plugin-markdown@2.2.1 eslint-plugin-jsx-a11y@6.6.0 eslint-plugin-import@2.26.0 redux-saga-test-plan 

echo "Remove package-lock.json"
rm -f package-lock.json

echo "husky initial"
husky init && yarn

echo "set scripts for initial changelog"
npm pkg set scripts.initial:changelog="npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0"

echo "set scripts for append changelog"
npm pkg set scripts.append:changelog="npx conventional-changelog -p angular -i CHANGELOG.md -s"

echo "set scripts for set version control"
npm pkg set scripts.append:release:patch="npx standard-version --release-as patch"
npm pkg set scripts.release:minor="npx standard-version --release-as minor"
npm pkg set scripts.release:major="npx standard-version --release-as major"
