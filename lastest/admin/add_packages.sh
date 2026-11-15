#!/bin/bash

echo "Pin react..."
yarn add react@19.3.1 react-dom@19.3.1

echo "Add redux..."
yarn add redux@5.0.1 react-redux@9.3.1 redux-saga@1.6.0 redux-persist@6.0.0

echo "Add router..."
yarn add react-router@7.18.5

echo "Add UI element..."
yarn add @mui/material@9.5.0 @mui/system@9.5.0 @mui/icons-material@9.5.0 @emotion/react@11.14.0 @emotion/styled@11.14.1 @tabler/icons-react@3.51.0 react-perfect-scrollbar@1.5.8 react-apexcharts@2.2.1 apexcharts@8.8.2 material-ui-popup-state@5.3.7 framer-motion@14.14.0

echo "Packages..."
yarn add axios@1.21.1 flux-constants@0.2.2 formik@2.4.9 yup@1.7.1 lodash@4.18.1 react-device-detect@2.2.3 web-vitals@6.2.3

echo "Dev Packages..."
yarn add -D vite@8.3.8 @vitejs/plugin-react@6.3.0 oxlint@1.93.0 sass@1.108.2

echo "Test Packages..."
yarn add -D vitest@5.1.0 jsdom@31.0.1 @testing-library/react@16.3.3 @testing-library/dom@10.4.2 @testing-library/jest-dom@7.0.1 redux-saga-test-plan@4.0.6

echo "set scripts for test"
npm pkg set scripts.test="vitest run"
npm pkg set scripts.test:watch="vitest"

echo "set scripts for initial changelog"
npm pkg set scripts.initial:changelog="npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0"

echo "set scripts for append changelog"
npm pkg set scripts.append:changelog="npx conventional-changelog -p angular -i CHANGELOG.md -s"

echo "set scripts for set version control"
npm pkg set scripts.append:release:patch="npx standard-version --release-as patch"
npm pkg set scripts.release:minor="npx standard-version --release-as minor"
npm pkg set scripts.release:major="npx standard-version --release-as major"
