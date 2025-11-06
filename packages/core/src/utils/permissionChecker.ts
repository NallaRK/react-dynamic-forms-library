/**
 * Permission Checker Utility
 * Checks user permissions and roles for field access
 */

import type { FieldPermissions, UserPermissions } from '../types';

/**
 * Check if user has required roles
 */
export const hasRequiredRoles = (
  userRoles: string[],
  requiredRoles?: string[]
): boolean => {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true; // No role requirement
  }

  return requiredRoles.some(role => userRoles.includes(role));
};

/**
 * Check if user has required permissions
 */
export const hasRequiredPermissions = (
  userPermissions: Record<string, boolean>,
  requiredPermissions?: string[]
): boolean => {
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true; // No permission requirement
  }

  return requiredPermissions.every(permission => userPermissions[permission] === true);
};

/**
 * Determine field access mode based on permissions
 */
export const getFieldAccessMode = (
  fieldPermissions: FieldPermissions | undefined,
  userPermissions: UserPermissions
): 'hidden' | 'view' | 'edit' => {
  if (!fieldPermissions) {
    return 'edit'; // Default to full access if no permissions defined
  }

  // Check if user has required roles
  const hasRoles = hasRequiredRoles(userPermissions.roles, fieldPermissions.roles);

  // Check if user has required permissions
  const hasPerms = hasRequiredPermissions(
    userPermissions.permissions,
    fieldPermissions.permissions
  );

  // If user doesn't have required roles or permissions, use the defined mode or hide
  if (!hasRoles || !hasPerms) {
    return fieldPermissions.mode || 'hidden';
  }

  // User has access, return the specified mode or default to edit
  return fieldPermissions.mode || 'edit';
};

/**
 * Check if field should be visible to user
 */
export const isFieldAccessible = (
  fieldPermissions: FieldPermissions | undefined,
  userPermissions: UserPermissions
): boolean => {
  const accessMode = getFieldAccessMode(fieldPermissions, userPermissions);
  return accessMode !== 'hidden';
};

/**
 * Check if field should be read-only for user
 */
export const isFieldReadOnly = (
  fieldPermissions: FieldPermissions | undefined,
  userPermissions: UserPermissions
): boolean => {
  const accessMode = getFieldAccessMode(fieldPermissions, userPermissions);
  return accessMode === 'view';
};

/**
 * Check if user can edit the form
 */
export const canEditForm = (
  formPermissions: { requiredRoles?: string[]; requiredPermissions?: string[] },
  userPermissions: UserPermissions
): boolean => {
  const hasRoles = hasRequiredRoles(userPermissions.roles, formPermissions.requiredRoles);
  const hasPerms = hasRequiredPermissions(
    userPermissions.permissions,
    formPermissions.requiredPermissions
  );

  return hasRoles && hasPerms;
};