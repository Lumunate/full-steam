import { NextRequest, NextResponse } from 'next/server';

import { handleAuthorizeUserSession } from '@/lib/handlers/auth/handle-authorize-user-session';
import handleErrors from '@/lib/handlers/errors';
import NotFoundError from '@/lib/handlers/errors/types/NotFoundError';
import * as ServiceRepository from '@/repository/ServiceRepository';
import { updateUserService, deleteUserService } from '@/services/UserServiceService';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }

) {
  try {
    const { serviceId }:{serviceId: string} = await params; 

    const user = await handleAuthorizeUserSession();
    
    const userServices = await ServiceRepository.getUserServices(user.id);
    const serviceExists = userServices.some(us => us.serviceId === serviceId);
    
    if (!serviceExists) {
      throw new NotFoundError('Service not found for this user');
    }
    
    const body = await request.json();
    const result = await updateUserService(user.id, serviceId, body);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  try {
    const user = await handleAuthorizeUserSession();
    const { serviceId }:{serviceId: string} = await params; 
    
    const userServices = await ServiceRepository.getUserServices(user.id);
    const serviceExists = userServices.some(us => us.serviceId === serviceId);
    
    if (!serviceExists) {
      throw new NotFoundError('Service not found for this user');
    }
    
    const result = await deleteUserService(user.id, serviceId);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}
