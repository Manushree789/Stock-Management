import type { Employee } from "../types/Employee";
import { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Employee[]>('https://localhost:7243/api/cybageemployees')
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading employees...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.empId}>
            <strong>{emp.empName}</strong> ({emp.empDepartment}) - Salary: ₹{emp.empSalary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;