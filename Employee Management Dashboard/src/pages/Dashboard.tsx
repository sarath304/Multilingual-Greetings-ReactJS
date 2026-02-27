import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Employee } from '../types/employee'
import { getEmployees, deleteEmployee, toggleEmployeeStatus } from '../utils/storage'
import DashboardSummary from '../components/DashboardSummary'
import EmployeeList from '../components/EmployeeList'
import EmployeeForm from '../components/EmployeeForm'
import SearchAndFilter from '../components/SearchAndFilter'
import './Dashboard.css'

const Dashboard = () => {
  const { logout } = useAuth()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [genderFilter, setGenderFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    loadEmployees()
  }, [])

  useEffect(() => {
    filterEmployees()
  }, [employees, searchTerm, genderFilter, statusFilter])

  const loadEmployees = () => {
    setLoading(true)
    setTimeout(() => {
      const data = getEmployees()
      setEmployees(data)
      setLoading(false)
    }, 300)
  }

  const filterEmployees = () => {
    let filtered = [...employees]

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter((emp) =>
        emp.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by gender
    if (genderFilter !== 'all') {
      filtered = filtered.filter((emp) => emp.gender === genderFilter)
    }

    // Filter by status
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active'
      filtered = filtered.filter((emp) => emp.isActive === isActive)
    }

    setFilteredEmployees(filtered)
  }

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setShowForm(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setShowForm(true)
  }

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id)
      loadEmployees()
    }
  }

  const handleToggleStatus = (id: string) => {
    toggleEmployeeStatus(id)
    loadEmployees()
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingEmployee(null)
  }

  const handleFormSubmit = () => {
    loadEmployees()
    handleFormClose()
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Employee Management Dashboard</h1>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <DashboardSummary employees={employees} />

        <div className="dashboard-actions">
          <button onClick={handleAddEmployee} className="add-button">
            + Add Employee
          </button>
          <button onClick={handlePrint} className="print-button">
            🖨️ Print List
          </button>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          genderFilter={genderFilter}
          onGenderFilterChange={setGenderFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <EmployeeList
          employees={filteredEmployees}
          loading={loading}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onToggleStatus={handleToggleStatus}
        />
      </main>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  )
}

export default Dashboard

