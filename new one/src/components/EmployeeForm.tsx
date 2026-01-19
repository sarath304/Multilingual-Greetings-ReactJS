import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { Employee, EmployeeFormData } from '../types/employee'
import { addEmployee, updateEmployee } from '../utils/storage'
import { convertFileToBase64, validateImageFile } from '../utils/imageUtils'
import { INDIAN_STATES } from '../utils/constants'
import './EmployeeForm.css'

interface EmployeeFormProps {
  employee: Employee | null
  onClose: () => void
  onSubmit: () => void
}

const EmployeeForm = ({ employee, onClose, onSubmit }: EmployeeFormProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    fullName: '',
    gender: 'Male',
    dateOfBirth: '',
    profileImage: null,
    state: '',
    isActive: true,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormData, string>>>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (employee) {
      setFormData({
        fullName: employee.fullName,
        gender: employee.gender,
        dateOfBirth: employee.dateOfBirth,
        profileImage: employee.profileImage,
        state: employee.state,
        isActive: employee.isActive,
      })
      setImagePreview(employee.profileImage)
    } else {
      // Reset form for new employee
      setFormData({
        fullName: '',
        gender: 'Male',
        dateOfBirth: '',
        profileImage: null,
        state: '',
        isActive: true,
      })
      setImagePreview(null)
      setErrors({})
    }
  }, [employee])

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    } else {
      const dob = new Date(formData.dateOfBirth)
      const today = new Date()
      if (dob > today) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future'
      }
    }

    if (!formData.state) {
      newErrors.state = 'State is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof EmployeeFormData]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof EmployeeFormData]
        return newErrors
      })
    }
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setImagePreview(null)
      return
    }

    const validation = validateImageFile(file)
    if (!validation.valid) {
      setErrors((prev) => ({ ...prev, profileImage: validation.error }))
      setImagePreview(null)
      // Reset file input
      e.target.value = ''
      return
    }

    try {
      const base64 = await convertFileToBase64(file)
      setFormData((prev) => ({ ...prev, profileImage: base64 }))
      setImagePreview(base64)
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.profileImage
        return newErrors
      })
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        profileImage: 'Failed to process image. Please try again.',
      }))
      setImagePreview(null)
      // Reset file input
      e.target.value = ''
    }
  }

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, profileImage: null }))
    setImagePreview(null)
    // Reset file input
    const fileInput = document.getElementById('profileImage') as HTMLInputElement
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call delay
    setTimeout(() => {
      if (employee) {
        // Update existing employee
        updateEmployee(employee.id, {
          ...employee,
          ...formData,
        })
      } else {
        // Add new employee
        const newEmployee: Employee = {
          id: `EMP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...formData,
        }
        addEmployee(newEmployee)
      }

      setIsSubmitting(false)
      onSubmit()
    }, 500)
  }

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button onClick={onClose} className="close-button">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="gender">
                Gender <span className="required">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && (
                <span className="error-message">{errors.dateOfBirth}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="state">
                State <span className="required">*</span>
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={errors.state ? 'error' : ''}
              >
                <option value="">Select a state</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <div className="image-upload-section">
              {imagePreview ? (
                <div className="image-preview-container">
                  <div className="preview-wrapper">
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  </div>
                  <div className="image-actions">
                    <label htmlFor="profileImage" className="change-image-button">
                      Change Image
                      <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="image-input-hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="remove-image-button"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="image-upload-area">
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                  />
                  <label htmlFor="profileImage" className="image-upload-label">
                    <span className="upload-icon">📷</span>
                    <span>Click to upload or drag and drop</span>
                    <span className="upload-hint">PNG, JPG, GIF up to 5MB</span>
                  </label>
                </div>
              )}
              {errors.profileImage && (
                <span className="error-message">{errors.profileImage}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              <span>Active Employee</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeForm

