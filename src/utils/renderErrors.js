export const renderErrors = (errors, setError) => {
  for (const field in errors) {
    if (Object.hasOwnProperty.call(errors, field)) {
      setError(field, { type: "custom", message: errors[field] });
    }
  }
};
