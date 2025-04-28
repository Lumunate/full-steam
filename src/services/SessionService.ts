import * as SessionRepository from '@/repository/SessionRepository';
import {  CreateSessionInput } from '@/types/sessions';

export async function getAllSessions() {
  const sessions = await SessionRepository.findAllSessions();

  return  sessions ;
}

export async function createSession(data: CreateSessionInput) {
  const { name, duration, bookingDate } = data;
  
  const parsedDuration = parseInt(String(duration));
  
  const session = await SessionRepository.createSession({
    name,
    duration: parsedDuration,
    bookingDate
  });
  
  return session;
}

export async function getSessionById(sessionId: string) {
  const session = await SessionRepository.findSessionById(sessionId);

  return  session ;
}

export async function updateSession(sessionId: string, data: CreateSessionInput) {
  const { name, duration, bookingDate } = data;
  
  const parsedDuration = parseInt(String(duration));
  
  const session = await SessionRepository.updateSession(sessionId, {
    name,
    duration: parsedDuration,
    bookingDate
  });
  
  return session;
}

export async function deleteSession(sessionId: string) {
  const deletedSession = await SessionRepository.deleteSession(sessionId);

  return deletedSession;
}