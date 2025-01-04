// Roles: student, teacher
// Disciplines: Computer Science, Mathematics, Physics, Biology, Chemistry
// Academic status: active, academic leave, graduated, expelled

enum Role {
    Student = 'student',
    Teacher = 'teacher',
}

enum Discipline {
    ComputerScience = 'Computer Science',
    Mathematics = 'Mathematics',
    Physics = 'Physics',
    Biology = 'Biology',
    Chemistry = 'Chemistry',
}

enum AcademicStatus {
    Active = 'active',
    AcademicLeave = 'academic leave',
    Graduated = 'graduated',
    Expelled = 'expelled',
}

type Gender = 'male' | 'female'

type ContactInfo = {
    email: string
    phone: string
    firstName: string
    lastName: string
    birthDay: Date
    gender: Gender
}

class UniversityError extends Error {
    constructor(message : string) {
        super(message);
        this.name = "UniversityError";
    }
}

class University {
    name : string;
    courses : ICourse[] = [];
    groups : IGroup[] = [];
    people : IPerson[] = [];

    constructor(name : string) {
        this.name = name;
    }

    addCourse(course : ICourse) : void {
        this.courses.push(course);
    }

    addGroup(group : IGroup) : void {
        this.groups.push(group);
    }

    addPerson(person : IPerson) : void {
        this.people.push(person);
    }

    findGroupByCourse(course : ICourse) : IGroup | undefined  {
        return this.groups.find((group : IGroup) : boolean => group.course === course);
    }

    getAllPeopleByRole(role : Role) : IPerson[] | void {
        switch (role) {
            case Role.Student:
                return this.people.filter((person : IPerson) : boolean => person.role === Role.Student);
            case Role.Teacher:
                return this.people.filter((person : IPerson) : boolean => person.role === Role.Teacher);
            default:
                return this.assertNeverRole(role);
        }
    }

    assertNeverRole(role : never) : never {
        throw new Error(`Unhandled role: ${role}`);
    }
}

class Course {
    name : string;
    credits : number;
    discipline : Discipline;

    constructor(name : string, discipline : Discipline, credits : number) {
        this.name = name;
        this.credits = credits;
        this.discipline = discipline;
    }
}

class Group {
    name : string;
    course : ICourse;
    teacher : ITeacher;
    students : IStudent[] = [];

    constructor(name : string, course : ICourse, teacher : ITeacher) {
        this.name = name;
        this.course = course;
        this.teacher = teacher;
    }

    addStudent(student : IStudent) : void | never {
        if (this.students.includes(student)) {
            throw new UniversityError("Student is already in the group");
        }

        this.students.push(student);
    }

    removeStudentById(id : number) : void | never {
        const index : number = this.students.findIndex((student : IStudent) : boolean => student.id === id);

        if (!~index) {
            throw new UniversityError("Student not found in group");
        }

        this.students.splice(index, 1);
    }

    getAverageGroupScore() : number {
        if (this.students.length) {
            return 0;
        }

        const totalScore : number = this.students.reduce(
            (sum: number, student : IStudent) => sum + student.getAverageScore(),
            0
        );

        return totalScore / this.students.length;
    }

    getStudents() : IStudent[] {
        return [...this.students];
    }
}

class Person {
    static nextId : number = 1;

    firstName : string;
    lastName : string;
    birthDay : Date;
    id : number;
    gender : Gender;
    contactInfo : { email : string, phone : string };
    role : Role;

    constructor(info : ContactInfo, role : Role) {
        const { firstName, lastName, birthDay, gender, email, phone } = info;

        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDay = birthDay;
        this.id = Person.nextId++;
        this.gender = gender;
        this.contactInfo = { email, phone };
        this.role = role;
    }

    get fullName() : string {
        return `${this.lastName} ${this.firstName}`;
    }

    get age() : number {
        const today : Date = new Date();
        let age : number = today.getFullYear() - this.birthDay.getFullYear();
        const monthDiff : number = today.getMonth() - this.birthDay.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < this.birthDay.getDate())
        ) {
            age--;
        }

        return age;
    }
}

class Teacher extends Person {
    specializations : Discipline[] = [];
    courses : ICourse[] = [];

    constructor(info : ContactInfo, specializations : Discipline[] = []) {
        super(info, Role.Teacher);
        this.specializations = specializations;
    }

    assignCourse(course : ICourse) : void {
        this.courses.push(course);
    }

    removeCourse(courseName : ICourse['name']) : void {
        this.courses = this.courses.filter((course : ICourse) : boolean => course.name !== courseName);
    }

    getCourses() : ICourse[] {
        return [...this.courses];
    }
}

class Student extends Person {
    academicPerformance : { totalCredits : number, gpa : number } = {
        totalCredits: 0,
        gpa: 0,
    };
    enrolledCourses : ICourse[] = [];
    status : AcademicStatus;

    constructor(info : ContactInfo) {
        super(info, Role.Student);
        this.status = AcademicStatus.Active;
    }

    enrollCourse(course : ICourse) : void | never {
        if (this.status !== AcademicStatus.Active) {
            throw new UniversityError(
                "Cannot enroll: Student is not in active status"
            );
        }

        this.enrolledCourses.push(course);
        this.academicPerformance.totalCredits += course.credits;
    }

    getAverageScore() : number {
        return this.academicPerformance.gpa;
    }

    updateAcademicStatus(newStatus : AcademicStatus) : void {
        this.status = newStatus;
    }

    getEnrolledCourses() : ICourse[] {
        return [...this.enrolledCourses];
    }
}

interface IPerson {
    nextId: number
    firstName: string
    lastName: string
    birthDay: Date
    id: number
    gender: string
    contactInfo: IPersonContactInfo
    role: string
}

interface IPersonContactInfo {
    email: string
    phone: number
}

interface IStudent extends IPerson {
    academicPerformance: IAcademicPerformance
    enrolledCourses: ICourse[]
    status: string
    enrollCourse(): void
    getAverageScore(): number
    updateAcademicStatus(): void
    getEnrolledCourses(): ICourse[]
}

interface ITeacher extends IPerson {
    specializations: string[]
    courses: ICourse[]
}

interface IAcademicPerformance {
    totalCredits: number
    gpa: number
}

interface ICourse {
    name: string
    credits: number
    discipline: string
}

interface IGroup {
    name: string
    course: ICourse
    teacher: ITeacher
    students: IStudent[]
    addStudent(): void
    removeStudentById(): void
    getAverageGroupScore(): number
    getStudents(): IStudent[]
}

interface IUniversity {
    name: string
    courses: ICourse[]
    groups: IGroup[]
    people: IPerson[]
    addCourse(): void
    addGroup(): void
    addPerson(): void
    findGroupByCourse(): IGroup
    getAllPeopleByRole(): IPerson
    assertNeverRole(): never
}