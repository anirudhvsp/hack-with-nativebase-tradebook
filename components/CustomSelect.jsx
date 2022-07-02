import { CheckIcon, Select } from "native-base";
import { useState } from "react";

export default function CustomSelect({
  placeholder,
  options = [],
  name,
  handleChange,
}) {
  let [service, setService] = useState("");

  const onChange = (value) => {
    setService(value);
    handleChange(name, value);
  };

  return (
    <Select
      selectedValue={service}
      minWidth="200"
      size="lg"
      accessibilityLabel={placeholder}
      placeholder={placeholder}
      _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />,
      }}
      mt={1}
      onValueChange={onChange}
    >
      {options.map((option, idx) => (
        <Select.Item key={idx + 1} label={option.label} value={option.value} />
      ))}
    </Select>
  );
}
