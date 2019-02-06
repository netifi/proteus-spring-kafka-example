package io.netifi.proteus.example.kafka.service;

import io.netty.buffer.ByteBuf;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.kafka.receiver.KafkaReceiver;

import java.util.function.Function;
import java.util.function.Predicate;

@Component
public class DefaultNumberService implements NumberService {

  final Flux<StreamNumbersResponse> streamNumbersResponseFlux;

  @Autowired
  public DefaultNumberService(KafkaReceiver<Object, StreamNumbersResponse> kafkaReceiver) {
    // KafkaReceiver only allows on subscriber so publish a stream with refCnt to allow multiple
    // subscribers
    streamNumbersResponseFlux =
        kafkaReceiver
            .receiveAutoAck()
            .log() // Just log method to print whats happen...
            .flatMap(Function.identity())
            .map(ConsumerRecord::value)
            .publish()
            .refCount();
  }

  @Override
  public Flux<StreamNumbersResponse> streamNumbers(StreamNumbersRequest message, ByteBuf metadata) {
    // Filter message based on the type sent in
    return streamNumbersResponseFlux.filter(filter(message.getType()));
  }

  private Predicate<StreamNumbersResponse> filter(StreamNumbersRequest.Type type) {
    switch (type) {
      case ALL:
        return l -> true;
      case ODD:
        return l -> l.getNumber() % 2 == 1;
      case EVEN:
        return l -> l.getNumber() % 2 == 0;
      case NEGATIVE:
        return l -> l.getNumber() < 0;
      case POSITIVE:
        return l -> l.getNumber() > -1;
      default:
        throw new IllegalArgumentException("unknown type " + type);
    }
  }
}
