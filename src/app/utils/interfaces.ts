export interface IRegisterData{
    username:string,
    password:string,
    email:string
}

interface IAuthBase{
    password:string;
}

export interface IUserAuthData extends IAuthBase{
    username:string,
    email?:never
}

export interface IEmailAuthData extends IAuthBase{
    email:string,
    username?:never
}

export interface ITaskSingle{
    title:string,
    description:string,
    date:string,
    priority:number,
    isCompleted:boolean,
    repeat:boolean,
    tags:number[],
    linkedTo:false | string
}