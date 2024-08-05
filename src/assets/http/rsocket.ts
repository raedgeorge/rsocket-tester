import { useCallback, useEffect, useState } from "react";
import {
  encodeCompositeMetadata,
  MESSAGE_RSOCKET_ROUTING,
  encodeRoute,
  MESSAGE_RSOCKET_AUTHENTICATION,
  encodeBearerAuthMetadata,
  APPLICATION_JSON,
  BufferEncoders,
  MESSAGE_RSOCKET_COMPOSITE_METADATA,
  RSocketClient,
} from "rsocket-core";
import { ReactiveSocket } from "rsocket-types";
import RSocketWebSocketClient from "rsocket-websocket-client";

export const useSocket = <T, R>(
  route: string,
  requestType: string,
  hasPayload: boolean,
  payload?: R
) => {
  const [dataStream, setDataStream] = useState<T[]>([]);
  const [socket, setSocket] = useState<ReactiveSocket<any, any>>();

  const handleTokenExpiry = useCallback((error: string) => {
    if (error.toLowerCase().includes("expired")) {
      return;
    }
  }, []);

  const token = localStorage.getItem("token");
  const service = localStorage.getItem("service");

  // create a socket client instance for this Hook
  const connectRSocket = useCallback(() => {
    const client = new RSocketClient({
      setup: {
        keepAlive: 60000, // 60 seconds
        lifetime: 180000, // 180 seconds
        dataMimeType: APPLICATION_JSON.string,
        metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
      },
      transport: new RSocketWebSocketClient(
        {
          url:
            "wss://gatewayprod.thymeapp.site/rx/" + service + "?token=" + token,
          debug: true,
        },
        BufferEncoders
      ),
    });

    client.connect().then((socket) => {
      console.log("socket connected");
      setSocket(socket);
    }),
      (error: Error) => {
        console.log("connection failed", error.message);
        setTimeout(connectRSocket, 5000);
      };
  }, [token, route]);

  useEffect(() => {
    connectRSocket();

    return () => socket?.close();
  }, [connectRSocket]);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (!route || !requestType || !socket) {
      return;
    }

    if (hasPayload && !payload) {
      return;
    }

    /* used to cancel the subscription once data stream completed */
    let subscription: any;
    let isSubscribed = true;

    /* to ensure data stream is empty before re-fetching new data */
    setDataStream([]);

    /* all required data available and response is a stream */
    if (requestType === "dataStream") {
      console.log("check data stream");
      socket
        .requestStream({
          data: payload ? Buffer.from(JSON.stringify(payload)) : null,
          metadata: encodeCompositeMetadata([
            [MESSAGE_RSOCKET_ROUTING, encodeRoute(route)],
            [MESSAGE_RSOCKET_AUTHENTICATION, encodeBearerAuthMetadata(token)],
          ]),
        })
        .subscribe({
          onComplete: () => {
            console.log("Data Stream Completed");
          },
          onNext(value) {
            if (!isSubscribed) return;
            const decodedData = new TextDecoder().decode(value.data);
            // const jsonData = JSON.parse(decodedData) as T;
            const jsonData = JSON.parse(decodedData);
            setDataStream((prevData) => [...prevData, jsonData]);
          },
          onError(error: Error) {
            handleTokenExpiry(error.message);
            console.log("Socket error: " + error.message);
            setTimeout(connectRSocket, 5000);
          },
          onSubscribe(sub) {
            subscription = sub;
            sub.request(2147483647);
          },
        });
      return () => {
        isSubscribed = false;
        if (subscription) subscription.cancel();
      };
    }

    /* all required data available and response is 1 object */
    if (requestType === "singleStream") {
      socket
        .requestStream({
          data: payload ? Buffer.from(JSON.stringify(payload)) : null,
          metadata: encodeCompositeMetadata([
            [MESSAGE_RSOCKET_ROUTING, encodeRoute(route)],
            [MESSAGE_RSOCKET_AUTHENTICATION, encodeBearerAuthMetadata(token)],
          ]),
        })
        .subscribe({
          onComplete: () => {
            console.log("Data Stream Completed");
          },
          onNext(value) {
            if (!isSubscribed) return;
            const decodedData = new TextDecoder().decode(value.data);
            const jsonData = JSON.parse(decodedData) as T;
            setDataStream([jsonData]);
          },
          onError(error: Error) {
            handleTokenExpiry(error.message);
            console.log("Socket error: " + error.message);
            setTimeout(connectRSocket, 5000);
          },
          onSubscribe(sub) {
            subscription = sub;
            sub.request(1);
          },
        });
      return () => {
        isSubscribed = false;
        if (subscription) subscription.cancel();
      };
    }

    if (requestType === "response") {
      socket
        .requestResponse({
          data: null,
          metadata: encodeCompositeMetadata([
            [MESSAGE_RSOCKET_ROUTING, encodeRoute(route)],
            [MESSAGE_RSOCKET_AUTHENTICATION, encodeBearerAuthMetadata(token)],
          ]),
        })
        .subscribe({
          onComplete: () => {
            console.log("Completed");
          },
          onError: (error: Error) => {
            handleTokenExpiry(error.message);
            console.log("RSocket Error: " + error.message);
            setTimeout(connectRSocket, 5000);
          },
          onSubscribe(cancel) {
            cancel();
          },
        });
    }
  }, [route, socket, payload, hasPayload, requestType]);

  if (dataStream.length > 0) return dataStream;

  return [];
};
