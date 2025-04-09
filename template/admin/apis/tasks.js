import server from "./";

export const getTasksResult = ({ customHeaders, payload }) => {
    const response = server.get("/tasks", {headers: customHeaders, params: payload});
    return response;
}

export const createTaskResult = ({ customHeaders, payload }) => {
    const response = server.post("/tasks", payload, {headers: customHeaders});
    return response;
}

export const deleteTaskResult = ({ customHeaders, payload }) => {
    const response = server.delete(`/tasks/${payload.taskId}`, {headers: customHeaders});
    return response;
}
