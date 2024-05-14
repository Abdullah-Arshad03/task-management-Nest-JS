import { TaskStatus } from "../tasks.model";

export class GetTaskFilterDto {
    status?: TaskStatus
    search?: string
}

// we keep both of them optional, because we might not want them 