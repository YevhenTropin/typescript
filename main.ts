type User = {
    username: string
    password: string
};

type Guest = {
    sessionId: string
}

type Admin = {
    role: string
    username: string
    password: string
}

type ExternalUser = {
    oauthToken: string
}

type UserType = User | Guest | Admin | ExternalUser

function login(entity: UserType): void {
    if (isUser(entity)) {
        console.log(`User ${entity.username} logged in`);
    } else if (isGuest(entity)) {
        console.log(`Guest with sessionId ${entity.sessionId} logged in`);
    } else if (isAdmin(entity)) {
        console.log(`Admin ${entity.username} logged in`);
    } else if (isExternalUser(entity)) {
        console.log(`External user with oauthToken: ${entity.oauthToken} logged in`);
    } else {
        throw new Error('Unknown entity type');
    }
}

function isUser(value: unknown): value is User {
    return Boolean(
        value &&
        typeof value === 'object' &&
        'username' in value &&
        typeof value.username === 'string' &&
        'username' !== undefined &&
        'password' in value &&
        typeof value.password === 'string' &&
        'password' !== undefined
    )
}

function isGuest(value: unknown): value is Guest {
    return Boolean(
        value &&
        typeof value === 'object' &&
        'sessionId' in value &&
        typeof value.sessionId === 'string' &&
        'sessionId' !== undefined
    )
}

function isAdmin(value: unknown): value is Admin {
    return Boolean(
        value &&
        typeof value === 'object' &&
        'username' in value &&
        typeof value.username === 'string' &&
        'username' !== undefined &&
        'role' in value &&
        typeof value.role === 'string' &&
        'role' !== undefined &&
        'password' in value &&
        typeof value.password === 'string' &&
        'password' !== undefined
    )
}

function isExternalUser(value: unknown): value is ExternalUser {
    return Boolean(
        value &&
        typeof value === 'object' &&
        'oauthToken' in value &&
        typeof value.oauthToken === 'string' &&
        'oauthToken' !== undefined
    )
}