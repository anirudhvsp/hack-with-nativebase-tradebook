import { CheckIcon, Select } from "native-base";
import { useState } from "react";

export default function CustomSelect({ placeholder, options = [] }) {
  let [service, setService] = useState("");
  return (
    <Select
      selectedValue={service}
      minWidth="200"
      accessibilityLabel={placeholder}
      placeholder={placeholder}
      _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />,
      }}
      mt={1}
      onValueChange={(itemValue) => setService(itemValue)}
    >
      {options.map((option, idx) => (
        <Select.Item key={idx + 1} label={option.label} value={option.value} />
      ))}
    </Select>
  );
}
