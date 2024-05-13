// we can define model as an task or an interface.// we will use the classes for sure throughout the course, while interaction with the databases, using the type ORM, but right now we are using the interface for creating model


export interface Task{
    id: string
    title: string
    description: string
    status: TaskStatus
    // task is the intereting one, as we need set of predefined status, they are also the strings. SO WE USE ENUM HERE.
    //we are saying that, status only allow values present in one of the enumeration, like present in the enum.
}

enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGESS',
    DONE = 'DONE'
}