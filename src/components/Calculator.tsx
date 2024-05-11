import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Employee from "../models/Employee";

export type CalculatorProps = {
    employee: Employee,
    onCancel: () => void,
    onUpdate: (employee: Employee) => void,
};

export type CalculatorState = {
    salary: number;
    modalShow: boolean;
};

const taxBands = [
    { lower: 0, upper: 5000, percentage: 0 },
    { lower: 5000, upper: 20000, percentage: 0.2 },
    { lower: 20000, upper: Number.MAX_SAFE_INTEGER, percentage: 0.4 },
];

const calculateTax = (salary: number) => {
    let tax = 0;
    for (let i = 0; i < taxBands.length; i++)
    {
        let band = taxBands[i];
        if (salary > band.lower && band.percentage > 0)
            tax += Math.min(band.upper - band.lower, salary - band.lower) * band.percentage;
    }
    return tax;
};

export default function Calculator({ employee, onCancel, onUpdate }: CalculatorProps)
{
    const [state, setState] = useState<CalculatorState>({ salary: employee.salary, modalShow: false });
    const tax = calculateTax(state.salary);
    const net = state.salary - tax;
    const salaryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(
            (x) => ({ ...x, salary: parseFloat(event.target.value.replace(/\D/, "")) })
        );
    };
    const showHandler = () => setState((x) => ({ ...x, modalShow: true }));
    const hideHandler = () => setState((x) => ({ ...x, modalShow: false }));
    const updateHandler = () => {
        employee.salary = state.salary;
        onUpdate(employee);
        hideHandler();
    };

    return (
        <>
        <div className="calculator container">
            <div className="calculator-head">
                <Row className="mb-2">
                    <Col xs="12">{`${employee.firstName} ${employee.lastName}`}</Col>
                </Row>
                <Row className="mb-2">
                    <Col sm="4">
                        <Form.Label>Gross Annual Salary</Form.Label>
                    </Col>
                    <Col sm="4">
                        <Form.Label>{state.salary}</Form.Label>
                    </Col>
                    <Col sm="4">
                        <div className="d-grid gap-0">
                            <Button type="button" variant="warning" onClick={showHandler}>Edit</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="calculator-body">
                <div className="d-grid gap-0">
                    <Row className="mb-3">
                        <Col xs="6">
                            <span className="calculator-label float-end">Gross Annual Salary: </span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label calculator-value-label">£{state.salary.toFixed(2)}</span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label float-end">Gross Monthly Salary: </span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label calculator-value-label">£{(state.salary / 12).toFixed(2)}</span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label float-end">Net Annual Salary: </span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label calculator-value-label">£{net.toFixed(2)}</span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label float-end">Net Monthly Salary: </span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label calculator-value-label">£{(net / 12).toFixed(2)}</span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label float-end">Annual Tax Paid: </span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label calculator-value-label">£{tax.toFixed(2)}</span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label float-end">Monthly Tax Paid: </span>
                        </Col>
                        <Col xs="6">
                            <span className="calculator-label calculator-value-label">£{(tax / 12).toFixed(2)}</span>
                        </Col>
                    </Row>
                    <Button type="button" variant="secondary" size="sm" onClick={onCancel}>Back</Button>
                </div>
            </div>
        </div>
        <Modal centered show={state.modalShow} onHide={hideHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Update Employee Salary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm="4">Current Value: </Form.Label>
                    <Col sm="8">
                        <Form.Control plaintext readOnly defaultValue={employee.salary} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="salary">
                    <Form.Label column sm="4">New Value: </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            value={state.salary}
                            onChange={salaryChangeHandler}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="secondary" onClick={hideHandler}>Cancel</Button>
                <Button type="button" variant="primary" onClick={updateHandler}>Update</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}