export default class Employee {
    id: number;
    lastName: string;
    firstName: string;
    salary: number;
    isEnabled: boolean;

    constructor(id: number, last: string, first: string, salary: number, isEnabled: boolean) {
        this.id = id;
        this.lastName = last;
        this.firstName = first;
        this.salary = salary;
        this.isEnabled = isEnabled;
    }
}

export function GetEmployeeTestList() {
    return [
        new Employee(1, "Employee1", "Test", 10000, true),
        new Employee(2, "Employee2", "Test", 20000, true),
        new Employee(3, "Employee3", "Test", 40000, true)
    ];
}