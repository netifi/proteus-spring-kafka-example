# proteus-spring-kafka-example client js
Demo application for [Netifi Proteus](https://www.netifi.com) and [RSocket](http://rsocket.io).

## Preparing the Demo

- Ensure you have Yarn, Node, and NPM installed:
    - https://nodejs.org/en/download/
    - https://www.npmjs.com/get-npm
    - https://yarnpkg.com/lang/en/docs/install/

## Running the Demo

- Fork/clone the repo and `cd` to the root directory from a terminal window
- Install the JavaScript dependencies with

    yarn

- The generated code in `src/main/resources/web/public/` should be
  checked in, and can be updated with:

    yarn run build

- To view the app in action, start a web server to host the JS:

    yarn start

- Hit http://localhost:3000 in a webbrowser

- The page will have several sections

## Modifying the Demo

To edit the homepage (including the JavaScript example code), do the following:

- In a text editor of your choice, open and modify `src/main/js/index.js` and/or `src/main/resources/index.html`

- Regenerate the website code in `src/main/resources/web/public/`  with:

    yarn run build

- Launch the new version of the website, which delivers your modified app with:

    yarn start
    
- Hit http://localhost:3000 in a webbrowser

### Notes

- This client consume messages from a Kafka topic via a streaming server

## Bugs and Feedback
For bugs, questions, and discussions please use the [Github Issues](https://github.com/netifi-proteus/proteus-browser-demo/issues).

## License
Copyright 2019 [Netifi Inc.](https://www.netifi.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
