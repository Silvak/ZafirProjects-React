import React from 'react'
import EditProjectForm from '../components/forms/editProjectForm';
import CreateProjectForm from '../components/forms/CreateProjectForm';
import CreateTaskForm from '../components/forms/createTaskForm';

function EditForm() {
  return (
    <div style={{margin: 40, display: "flex"}}>
      <div style={{marginRight: 20}}>
      
        <EditProjectForm />
      </div>
        <CreateProjectForm />
    </div>
  )
}

export default EditForm;