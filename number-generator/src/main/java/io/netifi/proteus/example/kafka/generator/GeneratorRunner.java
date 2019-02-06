package io.netifi.proteus.example.kafka.generator;

import io.netifi.proteus.example.kafka.service.StreamNumbersResponse;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.kafka.sender.KafkaSender;
import reactor.kafka.sender.SenderRecord;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.util.Date;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class GeneratorRunner implements CommandLineRunner {
  private static final Logger logger = LogManager.getLogger(GeneratorRunner.class);
  private final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss:SSS z dd MMM yyyy");
  @Autowired KafkaSender<Object, StreamNumbersResponse> kafkaSender;

  @Value("${netifi.proteus.kafka.topic}")
  String topic;

  @Override
  public void run(String... args) throws Exception {
    Flux<SenderRecord<Object, StreamNumbersResponse, Long>> records =
        Flux.interval(Duration.ofSeconds(1))
            .map(
                l -> {
                  long number = ThreadLocalRandom.current().nextLong();
                  StreamNumbersResponse response =
                      StreamNumbersResponse.newBuilder().setNumber(number).build();

                  return SenderRecord.create(new ProducerRecord<>(topic, response), number);
                });
    kafkaSender
        .send(records)
        .doOnError(e -> logger.error("Send failed", e))
        .doOnNext(
            r -> {
              RecordMetadata metadata = r.recordMetadata();
              System.out.printf(
                  "Random number %d sent successfully, topic-partition=%s-%d offset=%d timestamp=%s\n",
                  r.correlationMetadata(),
                  metadata.topic(),
                  metadata.partition(),
                  metadata.offset(),
                  dateFormat.format(new Date(metadata.timestamp())));
            })
        .blockLast();
  }
}
