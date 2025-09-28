import Select from 'react-select';

const CategorySelector = ({ categories, selectedCategoryId, setSelectedCategoryId, setInputData }) => {
  const options = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const selectedOption = options.find((opt) => opt.value === selectedCategoryId) || null;

  const handleChange = (selected) => {
    const selectedId = selected ? selected.value : "";

    setSelectedCategoryId(selectedId); // UI state
    setInputData((prev) => ({
      ...prev,
      field_category: selectedId ? [{ target_id: selectedId }] : [],
    }));
  };

  return (
    <div className="mb-3">
      <label className="form-label">Category</label>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        isClearable
        placeholder="Select a category..."
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default CategorySelector;
