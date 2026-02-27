export interface Employee {
  id: string
  fullName: string
  gender: 'Male' | 'Female' | 'Other'
  dateOfBirth: string
  profileImage: string | null
  state: string
  isActive: boolean
}

export interface EmployeeFormData {
  fullName: string
  gender: 'Male' | 'Female' | 'Other'
  dateOfBirth: string
  profileImage: string | null
  state: string
  isActive: boolean
}

