// #1
function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[]
function sortArray<T, K extends keyof T>(arr: T[], key: K, compareFn: (a: T[K], b: T[K]) => number): T[]

function sortArray<T, K extends keyof T>(arr: T[], ...args: any[]): T[] {
    const arrCopy: T[] = [...arr]

    if (args.length === 1) {
        arrCopy.sort(args[0])
    } else if (args.length === 2) {
        const [key, compareFn] = args
        arrCopy.sort((a: T, b: T) => compareFn(a[key], b[key]))
    }

    return arrCopy
}

// #2
type DeepReadonly<T> = T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T

// #3
type DeepRequireReadonly<T> = T extends object
    ? { readonly [K in keyof T]-?: DeepRequireReadonly<T[K]> }
    : T

// #4
type PartialByKeys<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? T[P] | undefined : T[P]
}

// #5
type ReadonlyByKeys<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? Readonly<T[P]> : T[P]
}

// #6
type MutableByKeys<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? Readonly<T[P]> : T[P] extends Readonly<T[P]> ? T[P] : T[P]
}

// #7
type UpperCaseKeys <T> = {
    [K in keyof T as Uppercase<K & string>]: T[K]
}

// #8
type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: {
        value: T[K]
        writable: boolean
        enumerable: boolean
        configurable: boolean
    }
}