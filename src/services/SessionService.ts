import * as SessionRepository from '@/repository/SessionRepository';
export async function getAllSessions() {
  const sessions = await SessionRepository.findAllSessions();

  return { sessions };
}

export async function createSession(data: any) {
  const { name, duration } = data;
  
  const parsedDuration = typeof duration === 'string' ? parseInt(duration, 10) : duration;
  
  const session = await SessionRepository.createSession({
    name,
    duration: parsedDuration
  });
  
  return { session };
}

export async function getSessionById(sessionId: string) {
  const session = await SessionRepository.findSessionById(sessionId);

  return { session };
}

export async function updateSession(sessionId: string, data: any) {
  const { name, duration } = data;
  
  const parsedDuration = duration ? 
    (typeof duration === 'string' ? parseInt(duration, 10) : duration) : 
    undefined;
  
  const session = await SessionRepository.updateSession(sessionId, {
    name,
    duration: parsedDuration
  });
  
  return { session };
}

export async function deleteSession(sessionId: string) {
  await SessionRepository.deleteSession(sessionId);

  return { message: 'Session deleted successfully' };
}