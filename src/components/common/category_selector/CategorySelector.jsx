import Select from "react-select";
import colors from "../../../theme/colors";

const CategorySelector = ({
  categories = [], // array of {id, name}
  selectedCategoryId,
  setSelectedCategoryId,
  setInputData, // optional: for form mode
  includeAllOption = true, // add "All Categories" for filter mode
  onPageReset, // optional callback (filter mode)
  label = "Category",
  variant = "filter", // "filter" | "form"
}) => {
  // Build options
  const options = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  if (includeAllOption && variant === "filter") {
    options.unshift({ value: "", label: label });
  }

  // Pre-select current option
  const selectedOption =
    options.find((opt) => opt.value === selectedCategoryId) || null;

  // Handle change
  const handleChange = (selected) => {
    const selectedId = selected ? selected.value : "";

    setSelectedCategoryId(selectedId);

    if (variant === "filter" && onPageReset) {
      onPageReset();
    }

    if (variant === "form" && setInputData) {
      setInputData((prev) => ({
        ...prev,
        field_category: selectedId ? [{ target_id: selectedId }] : [],
      }));
    }
  };

  // ======================
  // RETURN: Filter Mode
  // ======================
  if (variant === "filter") {
    return (
      <div className="col-md-2">
        <Select
          options={options}
          value={selectedOption}
          placeholder="Category"
          onChange={handleChange}
          styles={{
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? colors.secondary : "#fff",
              color: "#333",
              cursor: "pointer",
              borderInlineStart: state.isFocused
                ? `3px solid ${colors.primary}`
                : "3px solid transparent",
              ":active": {
                ...provided[":active"],
                borderInlineStartColor: "transparent",
                backgroundColor: "transparent",
              },
            }),
            control: (provided, state) => ({
              ...provided,
              borderRadius: "",
              boxShadow: "",
              borderColor: state.isFocused ? colors.primary : "#cfcfcf",
              "&:hover": {
                borderColor: colors.primary,
              },
            }),
          }}
        />
      </div>
    );
  }

  // ======================
  // RETURN: Form Mode
  // ======================
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
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
