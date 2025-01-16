enum UserActionEnum {
    Create = 'CREATE_USER',
    Delete = 'DELETE_USER',
    Update = 'UPDATE_USER',
    Block = 'BLOCK_USER',
}

type UserCreate = {
    type: UserActionEnum.Create
    payload: {
        name: string,
        age: number,
    }
}

type UserDelete = {
    type: UserActionEnum.Delete
    payload: {
        userId: number,
    }
}

type UserUpdate = {
    type: UserActionEnum.Update
    payload: {
        userId: number,
        name?: string,
        age?: number,
    }
}

type UserBlock = {
    type: UserActionEnum.Block
    payload: {
        userId: number,
        reason: string,
    }
}

type Action = UserCreate | UserDelete | UserUpdate | UserBlock

function handleAction(action: Action): void {
    switch (action.type) {
        case UserActionEnum.Create:
            console.log(`User name: ${action.payload.name}`)
            console.log(`User age: ${action.payload.age}`)
            return
        case UserActionEnum.Delete:
            console.log(`User with id ${action.payload.userId} was deleted`)
            return
        case UserActionEnum.Update:
            if (action.payload.name) {
                console.log(`Name was updated to ${action.payload.name}`)
            }
            if (action.payload.age) {
                console.log(`Age was updated to ${action.payload.age}`)
            }
            console.log(`User name: ${action.payload?.name}`)
            return
        case UserActionEnum.Block:
            console.log(`User with id ${action.payload.userId} was blocked because of ${action.payload.reason}`)
            return
        default:
            const actionName: never = action
            throw new Error(`Unhandled user action: ${actionName}`)
    }
}