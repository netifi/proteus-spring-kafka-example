package io.netifi.proteus.example.kafka.service;

import com.google.protobuf.InvalidProtocolBufferException;
import org.apache.kafka.common.serialization.Deserializer;
import reactor.core.Exceptions;

import java.util.Map;

public class StreamNumbersResponseDeserializer implements Deserializer<StreamNumbersResponse> {
  @Override
  public void configure(Map<String, ?> configs, boolean isKey) {}

  @Override
  public StreamNumbersResponse deserialize(String topic, byte[] data) {
    try {
      return StreamNumbersResponse.parseFrom(data);
    } catch (InvalidProtocolBufferException e) {
      throw Exceptions.propagate(e);
    }
  }

  @Override
  public void close() {}
}
