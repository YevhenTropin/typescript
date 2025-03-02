// #1
type DeepMutable<T> = {
    -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K]
}

// #2
type PickByValueType<T, ValueType> = {
    [K in keyof T]: T[K] extends ValueType ? T[K] : never
}

// #3
type OmitByValueType<T, ValueType> = {
    [K in keyof T]: T[K] extends ValueType ? T[K] : never
}

// #4
type CustomReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never

// #5
type ExtendedCustomReturnType<T extends (...args: any[]) => any> = T extends (arg: infer P, ...args: any[]) => infer R ? [R, P] : never
