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
    console.log(`Name: ${person.name}`)
    console.log(`Age: ${person.age}`)
}

printPersonInfo(personData)