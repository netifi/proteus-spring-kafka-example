package io.netifi.proteus.example.kafka.service;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.IntegerDeserializer;
import org.apache.kafka.common.serialization.IntegerSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class Main {

  @Value("${netifi.proteus.kafka.bootstrapServers}")
  private String bootstrapServers;

  @Value("${netifi.proteus.kafka.topic}")
  private String topic;

  public static void main(String... args) {
    SpringApplication.run(Main.class, args);
  }

  @Bean
  KafkaReceiver<Object, StreamNumbersResponse> kafkaReceiver() {
    Map<String, Object> props = new HashMap<>();
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
    props.put(ConsumerConfig.CLIENT_ID_CONFIG, "sample-consumer");
    props.put(ConsumerConfig.GROUP_ID_CONFIG, "sample-group");
    props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, IntegerDeserializer.class);
    props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StreamNumbersResponseDeserializer.class);
    props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

    ReceiverOptions<Object, StreamNumbersResponse> receiverOptions =
        ReceiverOptions.<Object, StreamNumbersResponse>create(props)
            .subscription(Collections.singleton(topic));
    return KafkaReceiver.create(receiverOptions);
  }
}

