// #1
interface Success<T> {
    status: 'success'
    data: T
}

interface Error {
    status: 'error'
    error: string
}

type Result<T> = Success<T> | Error
function handleResult<T>(result: Result<T>): T {
    if (result.status === 'success') {
        return result.data
    } else {
        throw new Error(result.error)
    }
}

// #2
class Queue<T> {
    private elements: T[] = []

    enqueue(el: T): void {
        this.elements.push(el)
    }

    dequeue(): T | undefined {
        return this.elements.shift()
    }

    peek(): T | undefined {
        return this.elements[0]
    }

    size(): number {
        return this.elements.length
    }
}

// #3
function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    const arrCopy: T[] = [...arr]

    arrCopy.sort(compareFn)

    return arrCopy
}

// #4
function extractProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}

// #5
interface Identifiable {
    id: number
}

class Repository<T extends Identifiable> {
    private items: T[] = []

    add(item: T): void {
        if (this.items.some((existingItem: T): boolean => existingItem.id === item.id)) {
            throw new Error('The current item already exists')
        }
        this.items.push(item)
    }

    getById(id: number): T | undefined {
        return this.items.find((item: T): boolean => item.id === id)
    }

    removeById(id: number): boolean {
        const index: number = this.items.findIndex((item: T): boolean => item.id === id)
        if (index !== -1) {
            this.items.splice(index, 1)
            return true
        }
        return false
    }

    getAll(): T[] {
        return this.items
    }
}

class User implements Identifiable {
    constructor(public id: number, public name: string) {
        this.id = id
        this.name = name
    }
}

class Product implements Identifiable {
    constructor(public id: number, public name: string, public price: number) {
        this.id = id
        this.name = name
        this.price = price
    }
}

const userRepository = new Repository<User>()

userRepository.add(new User(1, 'John'))

console.log(userRepository.getAll())
console.log(userRepository.removeById(2))
console.log(userRepository.getById(1))

const productRepository = new Repository<Product>()

productRepository.add(new Product(1, 'Some Product', 100))
productRepository.add(new Product(2, 'Another Product', 200))

console.log(productRepository.getAll())
console.log(productRepository.removeById(2))
console.log(productRepository.getById(1))