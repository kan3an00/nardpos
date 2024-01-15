export function sanitizeUser(user: any): any {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
}