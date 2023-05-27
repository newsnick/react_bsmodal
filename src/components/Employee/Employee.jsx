import React, { useState, useEffect } from 'react'
import Modal from '../../components/Modal/Modal'
import user from '../../assets/images/user.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import UpdateUser from '../UpdateUser/UpdateUser'

const Employee = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees')
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees))
    }
  }, [])

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/employees.json')
      .then((response) => response.json())
      .then((data) => {
        const updatedEmployees = mergeEmployeesData(data)
        setEmployees(updatedEmployees)
        localStorage.setItem('employees', JSON.stringify(updatedEmployees))
      })
      .catch((error) => console.log(error))
  }, [])

  const mergeEmployeesData = (fetchedData) => {
    const storedEmployees = localStorage.getItem('employees')
    if (storedEmployees) {
      const storedData = JSON.parse(storedEmployees)
      const mergedData = fetchedData.map((fetchedEmployee) => {
        const storedEmployee = storedData.find(
          (storedEmployee) => storedEmployee.id === fetchedEmployee.id
        )
        if (storedEmployee) {
          return {
            ...fetchedEmployee,
            name: storedEmployee.name,
            department: storedEmployee.department,
            location: storedEmployee.location,
          }
        }
        return fetchedEmployee
      })
      return mergedData
    }
    return fetchedData
  }

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id)
    setEmployees(updatedEmployees)
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))
  }

  const handleUpdate = (updatedEmployee) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === updatedEmployee.id) {
        return {
          ...employee,
          name: updatedEmployee.name,
          department: updatedEmployee.department,
          location: updatedEmployee.location,
        }
      }
      return employee
    })
    setEmployees(updatedEmployees)
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))
  }

  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          <div className="col bg-primary text-white">
            <strong>ID</strong>
          </div>
          <div className="col bg-primary text-white">
            <strong>Name</strong>
          </div>
          <div className="col bg-primary text-white">
            <strong>Department</strong>
          </div>
          <div className="col bg-primary text-white">
            <strong>Location</strong>
          </div>
          <div className="col bg-primary text-white">
            <strong>Photo</strong>
          </div>
          <div className="col bg-primary text-white">
            <strong>Delete User</strong>
          </div>
          <div className="col bg-primary text-white">
            <strong>View User</strong>
          </div>
          <div className="col bg-primary text-white">
            <strong>Update User</strong>
          </div>
        </div>
      </div>
      {employees.map((employee) => {
        return (
          <div className="container mt-3" key={employee.id}>
            <div className="row mt-5">
              <div className="col h5">{employee.id}</div>
              <div className="col h5">{employee.name}</div>
              <div className="col h5">{employee.department}</div>
              <div className="col h5">{employee.location}</div>
              <div className="col h5 mt-0">
                <img
                  src={user}
                  alt={`${employee.name}'s photo`}
                  width="100"
                  height="100"
                />
              </div>
              <div className="col h5">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(employee.id)}
                >
                  {employee.delete}
                </button>
              </div>
              <div className="col h5">
                <Modal employee={employee} />
              </div>
              <div className="col h5">
                <UpdateUser employee={employee} onUpdate={handleUpdate} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Employee
