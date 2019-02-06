package io.netifi.proteus.example.kafka.generator;

import io.netifi.proteus.example.kafka.service.StreamNumbersResponse;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.IntegerSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import reactor.kafka.sender.KafkaSender;
import reactor.kafka.sender.SenderOptions;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class Main {

  @Value("${netifi.proteus.kafka.bootstrapServers}")
  private String bootstrapServers;

  public static void main(String... args) {
    SpringApplication.run(Main.class, args);
  }

  @Bean
  KafkaSender<Object, StreamNumbersResponse> kafkaSender() {
    Map<String, Object> props = new HashMap<>();
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
    props.put(ProducerConfig.CLIENT_ID_CONFIG, "sample-producer");
    props.put(ProducerConfig.ACKS_CONFIG, "all");
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, IntegerSerializer.class);
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StreamNumberResponseSerializer.class);

    SenderOptions<Object, StreamNumbersResponse> senderOptions = SenderOptions.create(props);
    return KafkaSender.create(senderOptions);
  }
}
