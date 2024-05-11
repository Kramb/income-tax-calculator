import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Employee from "../models/Employee";
import useTable from "../hooks/useTable";

export type EmployeeListProps = {
    employees: Array<Employee>;
    onSelect: (emp: Employee) => void;
}

export default function EmployeeList({ employees, onSelect }: EmployeeListProps) {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const filteredEmployees = !search.length
        ? employees
        : employees.filter((emp) => emp.lastName.toLowerCase().includes(search.toLowerCase()) ||
            emp.firstName.toLowerCase().includes(search.toLowerCase()));
    const { slice, range } = useTable(filteredEmployees, page, 5);

    const clickHandler = (emp: Employee) => emp ? onSelect(emp) : null;
    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

    const pages = [];
    for (let num = 1; num <= range.length; num++) {
        pages.push(
            <Pagination.Item key={num} active={num === page} onClick={(e) => setPage(num)}>{num}</Pagination.Item>
        )
    }
    return (
        <div className="employee-list container">
            <Row className="mb-3">
                <Col xs={{offset: 8, span: 4}}>
                    <Form.Control type="search" value={search} placeholder="search" onChange={searchHandler} />
                </Col>
            </Row>
            <Table striped size="sm">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gross Annual Salary</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {slice.map((emp, idx) => (
                        <tr key={idx}>
                            <td>{emp.firstName}</td>
                            <td>{emp.lastName}</td>
                            <td>{emp.salary}</td>
                            <td className="view-button" onClick={() => clickHandler(emp)}>View</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-grid justify-content-end">
                <Pagination size="sm">{pages}</Pagination>
            </div>
        </div>
    );
}