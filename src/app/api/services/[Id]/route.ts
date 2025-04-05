import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import NotFoundError from '@/lib/handlers/errors/types/NotFoundError';
import * as ServiceService from '@/services/ServiceService';
import { getServiceById } from '@/services/ServiceService';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ Id: string }> }
  
) {
  try {
    const { Id }:{Id: string} = await params; 
    const service = await ServiceService.getServiceById(Id);
    
    if (!service) {
      throw new NotFoundError('Service not found');
    }
    
    const result = await getServiceById(Id);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}