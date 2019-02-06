package io.netifi.proteus.example.kafka.generator;


import io.netifi.proteus.example.kafka.service.StreamNumbersResponse;
import org.apache.kafka.common.serialization.Serializer;

import java.util.Map;

public class StreamNumberResponseSerializer implements Serializer<StreamNumbersResponse> {
  @Override
  public void configure(Map<String, ?> configs, boolean isKey) {}

  @Override
  public byte[] serialize(String topic, StreamNumbersResponse data) {
    return data.toByteArray();
  }

  @Override
  public void close() {}
}
