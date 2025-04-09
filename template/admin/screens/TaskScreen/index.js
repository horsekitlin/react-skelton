import { connect } from "react-redux";
import TaskScreen from "./view";
import { createTaskAction, deleteTaskAction, getTasksAction } from "actions/taskActions";

const mapStateToProps = ({auth, task}) => ({
  userId: auth.user.id,
  task,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetTasks: (payload) => {
    dispatch(getTasksAction(payload));
  },
  handleCreateTask: (payload) => {
    dispatch(createTaskAction(payload));
  },
  handleDeleteTask: (payload) => {
    dispatch(deleteTaskAction(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
