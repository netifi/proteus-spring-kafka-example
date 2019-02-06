# number-generator
Generates random numbers and pushes them to a Kafka topic


## Running the Service
From the root project, run the following command to start the service:

    ./gradlew :number-generator:run
    
Note: The client and service can be started in any order. The client will not send data until it detects that the service has started.
