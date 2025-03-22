import { UserRole } from '@prisma/client';

import { handleAuthorizeUserSession } from './handle-authorize-user-session';
import { handleRBAC } from './handle-rbac';

export const GENERAL_CRUD_ROLES = [UserRole.SERVICE_MASTER, UserRole.ADMIN, UserRole.USER];

export { handleAuthorizeUserSession, handleRBAC };
