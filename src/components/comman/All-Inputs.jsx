import React from "react";
import { useMovieContext } from "./Context";
import { useFunctionContext } from "./FunctionsContext";





export function Input_text({
  type,
  name,
  id,
  placeholder,
  value,
  SetForm,
  schema,
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
        placeholder={placeholder}
        value={value}
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
      />
      <p className="error"> {errors[name]}</p>
    </>
  );
}



export function Select_input({ name, value, schema, SetForm, options }) {
  const { errors, genresData } = useMovieContext();
  const { handleChange } = useFunctionContext();


  return (
    <>
      <select
        onChange={(e) => handleChange(e, schema, SetForm)}
        name={name}
        value={value}
      >
        <option value="">{name ? name : "select"}</option>
        {options &&
          options.map((option) => (
            <option value={option} key={option}>
              {option}
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
  minDate,
  maxDate,
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
        minDate={minDate}
        maxDate={maxDate}

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
  maxLength
}) {
  const { errors } = useMovieContext();
  const { handleChange } = useFunctionContext();
  return (
    <>
      <input
        className="form-control input-shado"
        type={type}
        name={name}
        value={value}
        maxLength={maxLength}
        onChange={(e) => handleChange(e, schema, SetForm)}
      />
      <div>
        <p className="error"> {errors[name]}</p>
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
  property
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