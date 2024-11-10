export enum TaskStatus {
    TODO = "to-do",
    IN_PROGRESS = "in-progress",
    DONE = "done",
}

export interface ITask {
    _id?: string;
    title: string;
    content: string;
    deadline: Date;
    status: TaskStatus;
    assignedTo: string | undefined;
    createdAt?: Date;
    updatedAt?: Date;
}
