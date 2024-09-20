import { io, Socket } from 'socket.io-client';

let socket: Socket | undefined;

export const getSocket = (): Socket => {
    socket = io(process.env.NEXT_PUBLIC_baseApiUrl as string, {
      withCredentials: true,
    });
    socket.on('connect', () => {
      console.log('Connected to server:', socket?.id);
    });
  return socket;
};
