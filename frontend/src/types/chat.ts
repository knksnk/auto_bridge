export interface ChatParticipant {
  id: string;
  name: string;
  role: "buyer" | "seller" | "manager";
}

export interface ChatMessage {
  id: string;
  authorId: string;
  text: string;
  time: string;
}

export interface ChatThread {
  id: string;
  carId: string;
  carTitle: string;
  sellerName: string;
  status: string;
  lastMessage: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
}
