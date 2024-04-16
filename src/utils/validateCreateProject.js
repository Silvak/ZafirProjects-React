const validateCreateProject = (formData) => {
  const values = Object.values(formData);
  if (values.includes("")) return false;
  else return true;
};

export default validateCreateProject;
