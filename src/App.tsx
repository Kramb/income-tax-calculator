import { useEffect, useState } from "react";
import axios from "axios";
import Employee from "./models/Employee";
import Calculator from "./components/Calculator";
import EmployeeList from "./components/EmployeeList";
import "./styles.scss";

type State = {
  data: {
    isLoaded: boolean,
    employees: Array<Employee>
  },
  selectedEmployee: Employee | null;
};

function App() {
  const [state, setState] = useState<State>({ selectedEmployee: null, data: { isLoaded: false, employees: [] } });
  const onCancel = () => setState((x) => ({ ...x, selectedEmployee: null }));
  const employeeSelectHandler = (emp: Employee) => setState((x) => ({ ...x, selectedEmployee: emp }));
  const updateHandler = async (emp: Employee) => {
    const updatedEmployees = state.data.employees;
    const employee = updatedEmployees.find((e) => e.lastName + e.firstName === emp.lastName + emp.firstName);
    if (employee) {
      const employeeIndex = updatedEmployees.indexOf(employee);
      employee.salary = emp.salary;
      try {
        let response = await axios.put(`api/employees/${employee.id}`, employee);
        if (response.status === 200) {
          updatedEmployees.splice(employeeIndex, 1, employee);
          setState((x) => ({ ...x, data: { ...x.data, employees: updatedEmployees } }));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        let response = await axios.get("api/employees");
        if (response.data)
          setState((x) => ({ ...x, data: { isLoaded: true, employees: response.data } }));
      } catch (error) {
        console.error(error);
      }
    };

    isMounted && getData();
    return () => {
      isMounted = false;
    }
  }, []);

  return (
    <div className="app">
      <div className="app-content">
        {!state.selectedEmployee ? (
          <EmployeeList employees={state.data.employees} onSelect={employeeSelectHandler} />
        ) : (
          <Calculator employee={state.selectedEmployee} onCancel={onCancel} onUpdate={updateHandler} />
        )}
      </div>
    </div>
  );
}

export default App;
