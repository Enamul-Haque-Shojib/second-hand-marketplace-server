export const AuthRole = {
  Admin: 'admin',
  User: 'user',
} as const;

export const authSearchableField = [
  'name',
  'email',
  'role',
];
