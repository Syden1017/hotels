export interface CreateSupportRequestDto {
  user: string;
  text: string;
}

export interface SendMessageDto {
  author: string;
  supportRequest: string;
  text: string;
}

export interface MarkMessagesAsReadDto {
  user: string;
  supportRequest: string;
  createdBefore: Date;
}

export interface GetChatListParams {
  user: string | null;
  isActive: boolean;
}
