import React from "react";
import { useMovieContext } from "./Context";
import { useFunctionContext } from "./FunctionsContext";
import moment, { max } from "moment";
import { min } from "numeric";





export function Input_Name({
  type,
  name,
  id,
  placeholder,
  value,
  SetForm,
  schema,
  min,
  max,
  maxLength,
  autoFocus
}) {
  const { errors } = useMovieContext();
  const { handleChange } = useFunctionContext();
  const handleInputChange = (e) => {
    const { value } = e.target;
    const isValid = /^[a-zA-Z\s]*$/.test(value);  // Regular expression to allow only alphabetic characters and spaces
    if (!isValid) return; // If the input contains invalid characters, do not update the value
    handleChange(e, schema, SetForm);
  };

  return (
    <>
      <input
        className="form-control"
        type={type}
        id={name}
        name={name}
        min={min}
        max={max}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        autoFocus={autoFocus}
      // onChange={(e) => handleChange(e, schema, SetForm)}
      />
      <p className="error"> {errors[name]}</p>
    </>
  );
}
export function Input_docnumbers({
  type,
  name,
  id,
  placeholder,
  value,
  SetForm,
  schema,
  min,
  max,
  minLength,
  maxLength,
  autoFocus
}) {
  const { errors } = useMovieContext();


  const { handleChange } = useFunctionContext();
  const handleInputChange = (e) => {
    const { value } = e.target;
    const isValid = /^[A-Za-z0-9]*$/.test(value);
    if (isValid) {

      handleChange(e, schema, SetForm);
    }
  };
  return (
    <>
      <input
        className="form-control"
        type={type}
        id={name}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        autoFocus={autoFocus}
      />
      <p className="error"> {errors[name]}</p>
    </>
  );
}
export function Input_text({
  type,
  name,
  id,
  placeholder,
  value,
  SetForm,
  schema,
  min,
  max,
  maxLength,
  autoFocus
}) {
  const { errors } = useMovieContext();
  const { handleChange } = useFunctionContext();

  const handleInputChange = (e) => {
    const { value } = e.target;
    const isValid = /^[a-zA-Z]*$/.test(value); // Regular expression to allow only alphabetic characters without spaces
    if (!isValid) return; // If the input contains invalid characters, do not update the value
    handleChange(e, schema, SetForm);
  };

  return (
    <>
      <input
        className="form-control"
        type={type}
        id={name}
        name={name}
        min={min}
        max={max}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        autoFocus={autoFocus}
      // onChange={(e) => handleChange(e, schema, SetForm)}
      />
      <p className="error"> {errors[name]}</p>
    </>
  );
}
export function Input_address({
  type,
  name,
  id,
  placeholder,
  value,
  SetForm,
  schema,
  min,
  max,
  maxLength,
  autoFocus
}) {
  const { errors } = useMovieContext();
  const { handleChange } = useFunctionContext();




  return (
    <>
      <input
        className="form-control"
        type={type}
        id={name}
        name={name}
        min={min}
        max={max}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        // onChange={handleInputChange}
        autoFocus={autoFocus}
        onChange={(e) => handleChange(e, schema, SetForm)}
      />
      <p className="error"> {errors[name]}</p>
    </>
  );
}


export function Input_email({
  type,
  name,
  id,
  placeholder,
  value,
  SetForm,
  schema,
  autoFocus
}) {
  const { errors, } = useMovieContext();
  const { handleChange } = useFunctionContext();


  return (
    <>
      <input
        className="form-control"
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e, schema, SetForm)}
        autoFocus={autoFocus}
      />
      <p className="error"> {errors[name]}</p>
    </>
  );
}



export function Select_input({ name, value, schema, SetForm, options }) {
  // console.log(name, options)
  // console.log("value in select -->", value)
  const { errors, genresData } = useMovieContext();
  const { handleChange } = useFunctionContext();


  return (
    <>
      <select
        onChange={(e) => handleChange(e, schema, SetForm)}
        name={name}
        value={value}
      >
        <option value="">--select--</option>
        {options &&
          options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      <p className="error"> {errors[name]}</p>
    </>
  );
}

export function Password_Input({
  type,
  name,
  placeholder,
  value,
  SetForm,
  schema,
  autoFocus
}) {
  const { errors } = useMovieContext();
  const { handleChange } = useFunctionContext();


  return (
    <>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => handleChange(e, schema, SetForm)}
      />
      <p className="error"> {errors[name]}</p>
    </>
  );
}

export function Date_Input({

  type,
  name,
  value,
  SetForm,
  schema,
  min,
  max,
  autoFocus,
  maxDate,
  minDate
}) {
  const { errors } = useMovieContext();
  const { handleChange } = useFunctionContext();

  return (
    <>
      <input
        className="form-control"
        type={type}
        name={name}
        value={value}
        min={min}
        max={max}
        minDate={minDate}
        maxDate={maxDate}
        autoFocus={autoFocus}


        onChange={(e) => handleChange(e, schema, SetForm)}
      />
      <p className="error"> {errors[name]}</p>
    </>
  );
}
export function Number_Input({
  type,
  name,
  value,
  SetForm,
  schema,
  maxLength,
  inputMode,
  autoFocus,
  placeholder
}) {
  const { errors } = useMovieContext();
  const { handleChange } = useFunctionContext();

  const handleNumberChange = (e) => {
    // Remove non-numeric characters from the input value
    const newValue = e.target.value.replace(/\D/g, "");

    // Call the handleChange function with the sanitized value
    handleChange({ target: { name, value: newValue } }, schema, SetForm);
  };

  return (
    <>
      <input
        className="form-control input-shado "
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        inputMode={inputMode}
        onChange={handleNumberChange}
        autoFocus={autoFocus}
      />
      <div>
        <p className="error">{errors[name]}</p>
      </div>
    </>
  );
}
export function SearchInput({
  type,
  name,
  value,
  SetForm,
  schema,
  autoFocus,
  placeholder
}) {
  const { errors } = useMovieContext();
  const { handleChange } = useFunctionContext();

  const handleInputChange = (e) => {
    const { value } = e.target;
    handleChange(e, schema, SetForm);
  };

  return (
    <>
      <input
        className="form-control input-shado"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange} // Use handleInputChange here
        autoFocus={autoFocus}
      />
      <div>
        <p className="error">{errors[name]}</p>
      </div>
    </>
  );
}


export function File_Input({
  type,
  name,
  placeholder,
  value,
  formData,
  newSetForm,
  schema,
  deleting,
  property,
  autoFocus
}) {
  const { errors } = useMovieContext();
  const { handleChange } = useFunctionContext();
  return (
    <>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e, schema, newSetForm)}
        autoFocus={autoFocus}
      />
      <p className="error"> {errors[name]}</p>
      <span className="delete_image" onClick={() => deleting(property)}>
        <i className="ri-delete-bin-5-line"></i>
      </span>
      <div className="position-relative">
        <img src={formData?.photo} className="document_image mt-1 rounded-2" />
      </div>
    </>
  );
}  