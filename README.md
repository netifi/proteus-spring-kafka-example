# proteus-spring-kafka-example
Simple project that shows how to use [reactor-kafka](https://github.com/reactor/reactor-kafka) with Proteus

## Projects
This repo contains the following projects:

* [client](client) - Client asks for a stream of numbers
* [client-js](client-js) - Web Browser client that request streams of numbers
* [service](service) - Service that reads a stream of numbers for kafka
* [service-idl](service-idl) - Definition of the API served by the service
* [number-generator](service-idl) - Application sends random numbers to kafka

## Prerequisites
The Proteus Spring Kafka Examples requires you have the following items installed on your machine:

* [Docker](https://docs.docker.com/install/)
* [Kafka](https://kafka.apache.org/)

## Proteus Broker Startup
 docker run -p 8001:8001 -p 7001:7001 -p 9000:9000 -p 8101:8101  \
 -e BROKER_SERVER_OPTS="'-Dnetifi.authentication.0.accessKey=9007199254740991'  \
'-Dnetifi.broker.console.enabled=true' \
'-Dnetifi.broker.ssl.disabled=true' \
'-Dnetifi.authentication.0.accessToken=kTBDVtfRBO4tHOnZzSyY5ym2kfY=' \
'-Dnetifi.broker.admin.accessKey=9007199254740991' \
'-Dnetifi.broker.admin.accessToken=kTBDVtfRBO4tHOnZzSyY5ym2kfY='" netifi/proteus:1.5.3

## Bugs and Feedback
For bugs, questions, and discussions please use the [Github Issues](https://github.com/netifi/proteus-spring-kafka-example/issues).

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
