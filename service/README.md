# service
Emits a stream of random numbers based on a type passed to it by a caller.

## Prerequisites
The service requires that a Netifi Proteus Broker instance is running and configued with the following access key and token:

* Access Key: `9007199254740991`
* Access Token: `kTBDVtfRBO4tHOnZzSyY5ym2kfY=`

Instructions for starting the Netifi Proteus Broker can be found in the main [README](../README.md).

## Running the Service
From the root project, run the following command to start the service:

    ./gradlew :service:run
    
Note: The client and service can be started in any order. The client will not send data until it detects that the service has started.
