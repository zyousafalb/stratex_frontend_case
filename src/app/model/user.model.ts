export class UserModel {

    id: number = -1;
    firstName: string = '';
    lastName: string = '';
    role : any = undefined;
}

export enum UserType {
    user = 1,
    seniorUser = 2 ,
    wfm = 3
}