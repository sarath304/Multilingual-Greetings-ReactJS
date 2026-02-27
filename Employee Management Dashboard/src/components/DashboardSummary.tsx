import { Employee } from '../types/employee'
import './DashboardSummary.css'

interface DashboardSummaryProps {
  employees: Employee[]
}

const DashboardSummary = ({ employees }: DashboardSummaryProps) => {
  const totalEmployees = employees.length
  const activeEmployees = employees.filter((emp) => emp.isActive).length
  const inactiveEmployees = totalEmployees - activeEmployees

  return (
    <div className="summary-container">
      <div className="summary-card total">
        <div className="summary-icon">👥</div>
        <div className="summary-content">
          <h3>Total Employees</h3>
          <p className="summary-number">{totalEmployees}</p>
        </div>
      </div>
      <div className="summary-card active">
        <div className="summary-icon">✅</div>
        <div className="summary-content">
          <h3>Active Employees</h3>
          <p className="summary-number">{activeEmployees}</p>
        </div>
      </div>
      <div className="summary-card inactive">
        <div className="summary-icon">⏸️</div>
        <div className="summary-content">
          <h3>Inactive Employees</h3>
          <p className="summary-number">{inactiveEmployees}</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardSummary

