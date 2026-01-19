import './SearchAndFilter.css'

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  genderFilter: string
  onGenderFilterChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
}

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  genderFilter,
  onGenderFilterChange,
  statusFilter,
  onStatusFilterChange,
}: SearchAndFilterProps) => {
  return (
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="gender-filter">Gender:</label>
          <select
            id="gender-filter"
            value={genderFilter}
            onChange={(e) => onGenderFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilter

