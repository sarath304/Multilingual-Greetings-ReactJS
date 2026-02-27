import { Employee } from '../types/employee'
import './EmployeeList.css'

interface EmployeeListProps {
  employees: Employee[]
  loading: boolean
  onEdit: (employee: Employee) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

const EmployeeList = ({
  employees,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
}: EmployeeListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading employees...</p>
      </div>
    )
  }

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <h3>No employees found</h3>
        <p>Get started by adding your first employee</p>
      </div>
    )
  }

  return (
    <div className="employee-list-container">
      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>State</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className={!employee.isActive ? 'inactive-row' : ''}>
                <td className="employee-id">{employee.id.slice(0, 8)}</td>
                <td>
                  <div className="profile-image-cell">
                    {employee.profileImage ? (
                      <img
                        src={employee.profileImage}
                        alt={employee.fullName}
                        className="profile-image"
                      />
                    ) : (
                      <div className="profile-placeholder">
                        {employee.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                </td>
                <td className="employee-name">{employee.fullName}</td>
                <td>{employee.gender}</td>
                <td>{formatDate(employee.dateOfBirth)}</td>
                <td>{employee.state}</td>
                <td>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={employee.isActive}
                      onChange={() => onToggleStatus(employee.id)}
                    />
                    <span className="toggle-slider"></span>
                    <span className="toggle-label">
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </label>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(employee)}
                      className="action-btn edit-btn"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(employee.id)}
                      className="action-btn delete-btn"
                      title="Delete"
                    >
                      🗑️
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="action-btn print-btn"
                      title="Print"
                    >
                      🖨️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeList

