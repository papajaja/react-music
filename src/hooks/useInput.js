import { useState } from "react";

const useInput = (initialValue, callback) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => {
    setValue(event.target.value);
    callback();
  };

  return { value, onChange };
};

export default useInput;
