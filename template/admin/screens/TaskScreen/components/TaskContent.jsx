import PropTypes from "prop-types";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TaskItem from "./TaskItem";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "100%" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
const TaskContent = (props) => {
    const {
        value,
        index,
        tasks,
        handleDeleteTask,
        handleGetTasksByQuery,
    } = props;
  return (
    <CustomTabPanel value={value} index={index}>
      <List sx={{ bgcolor: "background.paper", width: '100%' }}>
          {tasks.map((row) => {
            return <TaskItem key={row.id} row={row} handleDeleteTask={handleDeleteTask} handleGetTasksByQuery={handleGetTasksByQuery} />;
          })}
        </List>
    </CustomTabPanel>
  );
};

export default TaskContent;
