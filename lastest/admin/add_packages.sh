#!/bin/bash

echo "Pin react..."
yarn add react@19.3.1 react-dom@19.3.1

echo "Add redux..."
yarn add redux@5.0.1 react-redux@9.3.1 redux-saga@1.6.0 redux-persist@6.0.0

echo "Add router..."
yarn add react-router-dom@6.3.0

echo "Add UI element..."
yarn add @mui/material@9.5.0 @mui/system@9.5.0 @mui/icons-material@9.5.0 @emotion/react@11.14.0 @emotion/styled@11.14.1 @tabler/icons@1.72.0 react-perfect-scrollbar@1.5.8 react-apexcharts@2.2.1 apexcharts@8.8.2 material-ui-popup-state@4.0.1 framer-motion@14.14.0

echo "Packages..."
yarn add axios@1.21.1 flux-constants@0.2.2 formik@2.2.9 yup@1.7.1 lodash@4.18.1 prop-types@15.8.1 react-device-detect@2.2.2

echo "Dev Packages..."
yarn add -D sass@1.53.0 redux-saga-test-plan@4.0.6

echo "Remove unused packages"
yarn remove @testing-library/user-event

echo "Remove package-lock.json"
rm -f package-lock.json

echo "set scripts for initial changelog"
npm pkg set scripts.initial:changelog="npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0"

echo "set scripts for append changelog"
npm pkg set scripts.append:changelog="npx conventional-changelog -p angular -i CHANGELOG.md -s"

echo "set scripts for set version control"
npm pkg set scripts.append:release:patch="npx standard-version --release-as patch"
npm pkg set scripts.release:minor="npx standard-version --release-as minor"
npm pkg set scripts.release:major="npx standard-version --release-as major"
