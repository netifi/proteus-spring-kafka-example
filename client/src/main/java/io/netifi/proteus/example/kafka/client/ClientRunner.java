package io.netifi.proteus.example.kafka.client;

import io.netifi.proteus.example.kafka.service.NumberServiceClient;
import io.netifi.proteus.example.kafka.service.StreamNumbersRequest;
import io.netifi.proteus.spring.core.annotation.Group;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.concurrent.ThreadLocalRandom;

@Component
public class ClientRunner implements CommandLineRunner {
  private static final Logger logger = LogManager.getLogger(ClientRunner.class);

  @Group("proteus.kafkaDemo.numberService")
  private NumberServiceClient client;

  @Override
  public void run(String... args) throws Exception {
    // Pick a type at random stream the results
    StreamNumbersRequest.Type type = randomType();
    logger.info("Streaming numbers of type " + type.toString());

    client
        .streamNumbers(StreamNumbersRequest.newBuilder().setType(type).build())
        .doOnNext(s -> logger.info("found number {} of {}", s, type.toString()))
        .blockLast();
  }

  private StreamNumbersRequest.Type randomType() {
    StreamNumbersRequest.Type[] values = StreamNumbersRequest.Type.values();
    int i = ThreadLocalRandom.current().nextInt(0, values.length - 1);
    return values[i];
  }
}
