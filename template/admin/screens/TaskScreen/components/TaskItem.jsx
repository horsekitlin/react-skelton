import isFunction from "lodash/isFunction";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconFolder from "@mui/icons-material/Folder";
import IconDelete from "@mui/icons-material/Delete";

const DeleteIconButton = (props) => {
  const { taskId, handleDeleteTask, handleGetTasksByQuery } = props;
  if (isFunction(handleDeleteTask)) {
    return (
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => {
          handleDeleteTask({
            taskId,
            onSuccess: handleGetTasksByQuery,
          });
        }}
      >
        <IconDelete />
      </IconButton>
    );
  }

  return null;
};

const TaskItem = (props) => {
  const { row, handleDeleteTask, handleGetTasksByQuery } = props;

  return (
    <ListItem
      style={{ marginBottom: "10px", marginTop: "10px" }}
      secondaryAction={
        <DeleteIconButton taskId={row.id} handleDeleteTask={handleDeleteTask} handleGetTasksByQuery={handleGetTasksByQuery} />
      }
    >
      <ListItemAvatar>
        <Avatar>
          <IconFolder />
        </Avatar>
      </ListItemAvatar>
      <ListItemText id={row.id} primary={row.title} />
    </ListItem>
  );
};

export default TaskItem;
