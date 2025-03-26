import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import NotFoundError from '@/lib/handlers/errors/types/NotFoundError';
import * as ServiceRepository from '@/repository/ServiceRepository';
import { getServiceById } from '@/services/ServiceService';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serviceId = params.id;
    const service = await ServiceRepository.findServiceById(serviceId);
    
    if (!service) {
      throw new NotFoundError('Service not found');
    }
    
    const result = await getServiceById(serviceId);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}