import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportRequestService } from './support-request.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../auth/ws-jwt.guard';

@WebSocketGateway({ namespace: 'support' })
@UseGuards(WsJwtGuard)
export class SupportGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private supportRequestService: SupportRequestService) {}

  private userSockets = new Map<string, Socket[]>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!userId) {
      client.disconnect(true);
      return;
    }

    const userSockets = this.userSockets.get(userId) || [];
    userSockets.push(client);
    this.userSockets.set(userId, userSockets);

    const unsubscribe = this.supportRequestService.subscribe(
      (supportRequest, message) => {
        if (supportRequest.user.toString() === userId) {
          client.emit('newMessage', { supportRequest, message });
        }

        if (message.author.toString() !== userId) {
          client.emit('newMessage', { supportRequest, message });
        }
      },
    );

    client.on('disconnect', () => {
      unsubscribe();
      const sockets = this.userSockets.get(userId);
      if (sockets) {
        const index = sockets.indexOf(client);
        if (index !== -1) {
          sockets.splice(index, 1);
          if (sockets.length === 0) {
            this.userSockets.delete(userId);
          }
        }
      }
    });
  }

  handleDisconnect(client: any) {}
}
