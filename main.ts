abstract class Figure {
    name: string
    color: string

    constructor(name: string, color: string) {
        this.name = name
        this.color = color
    }

    abstract calculateArea(): number
    abstract calculatePerimeter(): number
    printInfo(): void {
        console.log(`Figure name: ${this.name}`)
        console.log(`Figure color: ${this.color}`)
        console.log(`Figure area: ${this.calculateArea()}`)
        console.log(`Figure perimeter: ${this.calculatePerimeter()}`)
    }
}

abstract class EllipticFigure extends Figure {
    static DIAMETER_KOEF: number = 2

    abstract printDiameter(): void
}

class Circle extends EllipticFigure {
    static AREA_EXPONENT: number = 2
    static PERIMETER_KOEF: number = 2

    radius: number

    constructor(color: string, radius: number) {
        super("Circle", color)
        this.radius = radius
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, Circle.AREA_EXPONENT)
    }

    calculatePerimeter(): number {
        return Circle.PERIMETER_KOEF * Math.PI * this.radius
    }

    printDiameter(): void {
        console.log(`Diameter: ${EllipticFigure.DIAMETER_KOEF * this.radius}`)
    }
}

class Ellipse extends EllipticFigure {
    static PERIMETER_KOEF: number = 3

    semiMajorAxis: number
    semiMinorAxis: number

    constructor(color: string, semiMajorAxis: number, semiMinorAxis: number) {
        super("Ellipse", color)
        this.semiMajorAxis = semiMajorAxis
        this.semiMinorAxis = semiMinorAxis
    }

    calculateArea(): number {
        return Math.PI * this.semiMajorAxis * this.semiMinorAxis
    }

    calculatePerimeter(): number {
        return Math.PI * (Ellipse.PERIMETER_KOEF * (this.semiMajorAxis + this.semiMinorAxis) - Math.sqrt((Ellipse.PERIMETER_KOEF * this.semiMajorAxis + this.semiMinorAxis) * (this.semiMajorAxis + Ellipse.PERIMETER_KOEF * this.semiMinorAxis)))
    }

    printDiameter(): void {
        console.log(`Major Diameter: ${EllipticFigure.DIAMETER_KOEF * this.semiMajorAxis}`)
        console.log(`Minor Diameter: ${EllipticFigure.DIAMETER_KOEF * this.semiMinorAxis}`)
    }
}

abstract class PolygonFigure extends Figure {
    sides: number[]
    constructor(sides: number[], name: string, color: string) {
        super(name, color)
        this.sides = [...sides]
    }

    getNumberOfSides(): number {
        return this.sides.length
    }

    abstract printAreaFormula(): void
}

abstract class Rectangle extends PolygonFigure {
    static PERIMETER_KOEF: number = 2

    width: number
    height: number

    constructor(width: number, height: number, color: string) {
        super([width, height, width, height], "Rectangle", color)
    }

    calculateArea(): number {
        return this.width * this.height
    }

    calculatePerimeter(): number {
        return Rectangle.PERIMETER_KOEF * (this.width + this.height)
    }

    printAreaFormula(): void {
        console.log("Area formula: width * height")
    }
}

class Square extends Rectangle {
    side: number
    constructor(side: number, color: string) {
        super(side, side, color)
        this.name = "Square"
    }
}

class Triangle extends PolygonFigure {
    static AREA_DIVIDER: number = 2
    static HEIGHT_EXPONENT: number = 2
    static HEIGHT_DIVIDER: number = 4
    static HEIGHT_KOEF: number = 2

    a: number
    b: number
    c: number

    constructor(a: number, b: number, c: number, color: string) {
        super([a, b, c], "Triangle", color)
    }

    calculateArea(): number {
        const s: number = this.calculatePerimeter() / Triangle.AREA_DIVIDER
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c))
    }

    calculatePerimeter(): number {
        return this.a + this.b + this.c
    }

    printAreaFormula(): void {
        console.log(`Area formula: √(s * (s - a) * (s - b) * (s - c)) where s = (a + b + c) / ${Triangle.AREA_DIVIDER}`)
    }

    printTriangleType(): void {
        if (this.a === this.b && this.b === this.c) {
            console.log("Equilateral Triangle")
        } else if (this.a === this.b || this.b === this.c || this.a === this.c) {
            console.log("Isosceles Triangle")
        } else {
            console.log("Scalene Triangle")
        }
    }

    calcHeight(): number {
        if (this.a === this.b) {
            return Math.sqrt(Math.pow(this.a, Triangle.HEIGHT_EXPONENT) - Math.pow(this.c, Triangle.HEIGHT_EXPONENT) / Triangle.HEIGHT_DIVIDER)
        }

        const area: number = this.calculateArea()
        return (Triangle.HEIGHT_KOEF * area) / this.c
    }
}