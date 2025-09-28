import Select from "react-select";
import "./TagSelector.css";

const TagSelector = ({
  tags,
  selectedTagIds,
  setSelectedTagIds,
  setInputData,
}) => {
  // Convert tags to react-select format
  const options = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  // Convert selected IDs to react-select format
  const selectedOptions = options.filter((opt) =>
    selectedTagIds.includes(opt.value)
  );

  const handleChange = (selected) => {
    const selectedIds = selected.map((opt) => opt.value);

    setSelectedTagIds(selectedIds); // UI state
    setInputData((prev) => ({
      ...prev,
      field_tags: selectedIds.map((id) => ({
        target_id: id,
      })),
    }));
  };

  return (
    <div className="mb-3">
      <label className="form-label">Tags</label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Select tags..."
      />
    </div>
  );
};

export default TagSelector;
