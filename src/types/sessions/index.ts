export interface Session {
    id: string;
    name: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
  }
  
export interface CreateSessionInput {
    name: string;
    duration: number;
  }