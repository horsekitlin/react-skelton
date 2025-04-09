import server from "./";

export const getTasksResult = async (params, headers) => {
    const { data: response } = await server.get('/tasks', {params, headers});
    return response;
}

export const createTaskResult = async (payload, headers) => {
    const { data: response } = await server.post('/tasks', payload, {headers});
    return response;
}

export const deleteTaskResult = (payload, headers) => {
    const response = server.delete(`/tasks/${payload.taskId}`, {headers});
    return response;
}
