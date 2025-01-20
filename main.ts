interface IData {
    name: string,
    age: number,
}

function fetchData(): unknown {
    return {
        "name": "John",
        "age": 42
    }
}

const personData: IData = fetchData() as IData

function printPersonInfo(person: IData): asserts person is IData {
    if (typeof person !== 'object' || person === null) {
        throw new Error("The person is not an object.")
    }
    if (typeof person.name !== 'string') {
        throw new Error("The 'name' property must be a string.")
    }
    if (typeof person.age !== 'number') {
        throw new Error("The 'age' property must be a number.")
    }

    console.log(`Name: ${person.name}`)
    console.log(`Age: ${person.age}`)
}

printPersonInfo(personData)