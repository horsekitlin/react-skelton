import { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import IconAdd from "@mui/icons-material/Add";

import { gridSpacing } from "constants";
import TaskContent from "./components/TaskContent";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TaskScreen = (props) => {
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("");

  const { userId, task, handleGetTasks, handleCreateTask, handleDeleteTask } = props;
  const queryArray = [
    { userId },
    { userId, isCompleted: false },
    { userId, isCompleted: true },
  ];

  const query = queryArray[value];

  const handleGetTasksByQuery = () => handleGetTasks(query);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    handleGetTasksByQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Grid container spacing={gridSpacing}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <FormControl sx={{ m: 1, width: "90%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Task</InputLabel>
          <OutlinedInput
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    if (!isEmpty(title)) {
                      const payload = {
                        title,
                        comment: "",
                        onSuccess: handleGetTasksByQuery,
                      };
                      handleCreateTask(payload);
                      setTitle("");
                    }
                  }}
                  edge="end"
                >
                  <IconAdd />
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {/* <TextField fullWidth label="fullWidth" id="fullWidth" /> */}
      </Box>
      <Tabs style={{width: "100%"}} value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="My Task" {...a11yProps(0)} />
        <Tab label="In Progress" {...a11yProps(1)} />
        <Tab label="Completed" {...a11yProps(2)} />
      </Tabs>
      <TaskContent tasks={task.rows} value={value} index={0} handleDeleteTask={handleDeleteTask} handleGetTasksByQuery={handleGetTasksByQuery} />
      <TaskContent tasks={task.rows} value={value} index={1} handleDeleteTask={handleDeleteTask} handleGetTasksByQuery={handleGetTasksByQuery} />
      <TaskContent tasks={task.rows} value={value} index={2} />
    </Grid>
  );
};
export default TaskScreen;
