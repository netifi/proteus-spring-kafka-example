// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var service_pb = require('./service_pb.js');

var NumberServiceClient = function () {
  function NumberServiceClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.streamNumbersTrace = rsocket_rpc_tracing.trace(tracer, "NumberService", {"rsocket.rpc.service": "io.netifi.proteus.example.kafka.service.NumberService"}, {"method": "streamNumbers"}, {"rsocket.rpc.role": "client"});
    this.streamNumbersMetrics = rsocket_rpc_metrics.timed(meterRegistry, "NumberService", {"service": "io.netifi.proteus.example.kafka.service.NumberService"}, {"method": "streamNumbers"}, {"role": "client"});
  }
  // A Stream of Random numbers can be filtered by type;
  NumberServiceClient.prototype.streamNumbers = function streamNumbers(message, metadata) {
    const map = {};
    return this.streamNumbersMetrics(
      this.streamNumbersTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.netifi.proteus.example.kafka.service.NumberService', 'streamNumbers', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return service_pb.StreamNumbersResponse.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  return NumberServiceClient;
}();

exports.NumberServiceClient = NumberServiceClient;

var NumberServiceServer = function () {
  function NumberServiceServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.streamNumbersTrace = rsocket_rpc_tracing.traceAsChild(tracer, "NumberService", {"rsocket.rpc.service": "io.netifi.proteus.example.kafka.service.NumberService"}, {"method": "streamNumbers"}, {"rsocket.rpc.role": "server"});
    this.streamNumbersMetrics = rsocket_rpc_metrics.timed(meterRegistry, "NumberService", {"service": "io.netifi.proteus.example.kafka.service.NumberService"}, {"method": "streamNumbers"}, {"role": "server"});
    this._channelSwitch = (payload, restOfMessages) => {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      let deserializedMessages;
      switch(method){
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    };
  }
  NumberServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  NumberServiceServer.prototype.requestResponse = function requestResponse(payload) {
    return rsocket_flowable.Single.error(new Error('requestResponse() is not implemented'));
  };
  NumberServiceServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'streamNumbers':
          return this.streamNumbersMetrics(
            this.streamNumbersTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .streamNumbers(service_pb.StreamNumbersRequest.deserializeBinary(binary), payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                }).subscribe(subscriber);
              }
            )
          )
        );
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Flowable.error(error);
    }
  };
  NumberServiceServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  NumberServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return NumberServiceServer;
}();

exports.NumberServiceServer = NumberServiceServer;

