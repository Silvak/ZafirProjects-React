import React, { useState, useRef } from "react";
import { Grid, IconButton, Button, TextField, Typography } from "@mui/material";
import { EditOutlined as EditOutlinedIcon } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBoundStore } from "../../stores";
import "./dataPicker.css";
import CustomSelect from "./CustomSelect";
import { useProject } from "@/hooks/useProject";

const TaskDetailContent = ({ task }) => {
  const { priority, state } = task || {};
  const [isEditing, setIsEditing] = useState(false);
  const [originalValues, setOriginalValues] = useState({});
  const [selectedDate, setSelectedDate] = useState(task.end);
  const inputRefs = {
    name: useRef(null),
    description: useRef(null),
    tags: useRef(null),
    members: useRef(null),
    priority: useRef(null),
  };
  const {
    updateTask,
    selectedProject,
    ChangeStateAlert,
    ChangeTitleAlert,
    ChangeStateAlertError,
    ChangeTitleAlertError,
    ChangeStateModal,
  } = useBoundStore();

  const {
    selectedLeader,
    filteredLeaders,
    handleSuggestionChange,
    handleSuggestionClick,
  } = useProject({ project: null, isCreated: true });

  const handleEdit = () => {
    const name = inputRefs.name.current.value;
    const description = inputRefs.description.current.value;
    const tags = inputRefs.tags.current.value;
    const members = inputRefs.members.current.value;
    const priority = inputRefs.priority.current.value;
    setIsEditing(true);
    setOriginalValues({ name, description, tags, members, priority });
  };

  const handleCancel = () => {
    inputRefs.name.current.value = originalValues.name;
    inputRefs.description.current.value = originalValues.description;
    inputRefs.tags.current.value = originalValues.tags;
    inputRefs.members.current.value = originalValues.members;
    setSelectedDate(task.end);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const newValues = {
      state: inputRefs.tags.current.value,
      priority: inputRefs.priority.current.value,
      end: selectedDate,
      members: inputRefs.members.current.value,
      data: [
        {
          name: inputRefs.name.current.value,
          description: inputRefs.description.current.value,
          tags: inputRefs.tags.current.value,
        },
      ],
    };

    const changesDetected =
      newValues.data[0].name !== task.data[0].name ||
      newValues.data[0].description !== task.data[0].description ||
      newValues.data[0].tags !== task.data[0].tags ||
      newValues.members !== task.members ||
      newValues.end !== task.end ||
      newValues.priority !== task.priority;

    if (!changesDetected) {
      ChangeTitleAlertError("No changes detected. No action required.");
      ChangeStateAlertError(true);
      setIsEditing(false);
      return;
    }
    setIsEditing(false);
    const params = selectedProject._id;
    try {
      await updateTask(task._id, newValues, params);
      setTimeout(() => {
        ChangeTitleAlert("Data has been updated successfully");
        ChangeStateAlert(true);
        ChangeStateModal(false);
      }, 1000);
    } catch (error) {
      ChangeTitleAlertError("Error:", error.message);
      ChangeStateAlertError(true);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          size="small"
          label="Leader"
          value={selectedLeader || task.members}
          defaultValue={task.members}
          inputRef={inputRefs.members}
          onChange={(e) => handleSuggestionChange(e, "leader")}
          fullWidth
          disabled={!isEditing}
          sx={{ mt: 4 }}
          InputLabelProps={{
            sx: {
              color: isEditing ? "inherit" : "blue",
            },
          }}
        />
        <div
          style={{
            marginLeft: 4,
            cursor: "pointer",
            backgroundColor: "white",
            borderRadius: 12,
          }}
        >
          {filteredLeaders.slice(0, 3).map((user) => (
            <p
              key={user.id}
              style={{ marginTop: 4 }}
              onClick={() => handleSuggestionClick(user, "leader")}
            >
              {user.name}
            </p>
          ))}
        </div>
      </Grid>
      <Grid item xs={12}>
        <TextField
          size="small"
          label="Task Name"
          defaultValue={task.data[0].name}
          inputRef={inputRefs.name}
          fullWidth
          autoFocus
          disabled={!isEditing}
          InputLabelProps={{
            sx: {
              color: isEditing ? "inherit" : "blue",
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          size="small"
          label="Task description"
          defaultValue={task.data[0].description}
          inputRef={inputRefs.description}
          fullWidth
          autoFocus
          disabled={!isEditing}
          InputLabelProps={{
            sx: {
              color: isEditing ? "inherit" : "blue",
            },
          }}
        />
      </Grid>

      {/* Prioridad con el selector personalizado */}
      <Grid item xs={12}>
        <CustomSelect
          size="small"
          label="Priority"
          options={["Low", "Medium", "High"]}
          disabled={!isEditing}
          defaultValue={priority}
          inputRef={inputRefs.priority}
          isEditing={isEditing}
        />
      </Grid>

      {/* CustomSelect también para el campo de tags */}
      <Grid item xs={12}>
        <CustomSelect
          size="small"
          label="Tags"
          options={[
            "Pending",
            "In Progress",
            "Issues",
            "Review",
            "Completed",
            "Backlog",
          ]}
          defaultValue={state}
          inputRef={inputRefs.tags}
          disabled={!isEditing}
          isEditing={isEditing}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="h6"
          style={{
            fontSize: 14,
            fontWeight: "normal",
            color: isEditing ? "black" : "darkgray",
          }}
        >
          Deadline
        </Typography>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          disabled={!isEditing}
          dateFormat="MM/dd/yyyy"
          className={isEditing ? "date-picker" : "date-picker-disable"}
          popperClassName="date-picker-popper"
        />
      </Grid>
      <Grid item xs={12}>
        {isEditing ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCancel}
              disableRipple
              style={{
                paddingInline: "1.5rem",
                borderRadius: 10,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disableRipple
              style={{
                color: "white",
                paddingInline: "2rem",
                borderRadius: 10,
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <IconButton
              disableRipple
              color="primary"
              size="small"
              sx={{
                "&:hover": {
                  color: "blue",
                  transition: "color 0.1s",
                },
              }}
              style={{
                cursor: "pointer",
                gap: 8,
              }}
              onClick={handleEdit}
            >
              <EditOutlinedIcon />
              Edit Task
            </IconButton>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default TaskDetailContent;
