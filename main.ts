interface ICalculator {
    add(a: number, b: number): number
    subtract(a: number, b: number): number
    multiply(a: number, b: number): number
    divide(a: number, b: number): number | never
    percent(a: number, b: number): number
    calculate(operation: string, a: number, b: number): number | never
}

class Calculator implements ICalculator {
    add(a: number, b: number): number {
        return a + b
    }

    subtract(a: number, b: number): number {
        return a - b
    }

    multiply(a: number, b: number): number {
        return a * b
    }

    divide(a: number, b: number): number | never {
        if (b === 0) {
            throw new Error("The second parameter cannot be zero")
        }

        return a / b
    }

    percent(a: number, b: number): number {
        return (a * b) / 100
    }

    calculate(operation: string, a: number, b: number): number | never {
        switch (operation.toLowerCase()) {
            case 'add':
                return this.add(a, b)
            case 'subtract':
                return this.subtract(a, b)
            case 'multiply':
                return this.multiply(a, b)
            case 'divide':
                return this.divide(a, b)
            case 'percent':
                return this.percent(a, b)
            default:
                throw new Error("Unknown operation")
        }
    }
}