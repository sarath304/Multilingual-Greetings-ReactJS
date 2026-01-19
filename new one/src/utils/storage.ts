import { Employee } from '../types/employee'

const STORAGE_KEY = 'employees'

export const getEmployees = (): Employee[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }
  return []
}

export const saveEmployees = (employees: Employee[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
}

export const addEmployee = (employee: Employee): void => {
  const employees = getEmployees()
  employees.push(employee)
  saveEmployees(employees)
}

export const updateEmployee = (id: string, updatedEmployee: Employee): void => {
  const employees = getEmployees()
  const index = employees.findIndex((emp) => emp.id === id)
  if (index !== -1) {
    employees[index] = updatedEmployee
    saveEmployees(employees)
  }
}

export const deleteEmployee = (id: string): void => {
  const employees = getEmployees()
  const filtered = employees.filter((emp) => emp.id !== id)
  saveEmployees(filtered)
}

export const toggleEmployeeStatus = (id: string): void => {
  const employees = getEmployees()
  const employee = employees.find((emp) => emp.id === id)
  if (employee) {
    employee.isActive = !employee.isActive
    saveEmployees(employees)
  }
}

