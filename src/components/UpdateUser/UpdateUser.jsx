import React, { useState, useEffect } from 'react'

const UpdateUser = ({ employee, onUpdate }) => {
  const [showModal, setShowModal] = useState(false)
  const [updatedName, setUpdatedName] = useState(employee.name)
  const [updatedDepartment, setUpdatedDepartment] = useState(
    employee.department
  )
  const [updatedLocation, setUpdatedLocation] = useState(employee.location)

  useEffect(() => {
    const storedEmployee = localStorage.getItem(`employee_${employee.id}`)
    if (storedEmployee) {
      const parsedEmployee = JSON.parse(storedEmployee)
      setUpdatedName(parsedEmployee.name)
      setUpdatedDepartment(parsedEmployee.department)
      setUpdatedLocation(parsedEmployee.location)
    }
  }, [employee.id])

  const displayModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleSave = () => {
    const updatedEmployee = {
      ...employee,
      name: updatedName,
      department: updatedDepartment,
      location: updatedLocation,
    }

    localStorage.setItem(
      `employee_${employee.id}`,
      JSON.stringify(updatedEmployee)
    )
    onUpdate(updatedEmployee)
    closeModal()
  }

  return (
    <div>
      <button type="button" className="btn btn-success" onClick={displayModal}>
        Update Profile
      </button>

      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  User Profile
                </h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Name:</strong>
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Department:</strong>
                  <input
                    type="text"
                    value={updatedDepartment}
                    onChange={(e) => setUpdatedDepartment(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Location:</strong>
                  <input
                    type="text"
                    value={updatedLocation}
                    onChange={(e) => setUpdatedLocation(e.target.value)}
                  />
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateUser
