export interface Check {
    success: boolean,
    userId?: string;
    role?:string,
    status?: number;
    message?:string;
}
