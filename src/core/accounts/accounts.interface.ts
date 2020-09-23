export interface IAccountsFunctions {
    createAccountsSrv: Function;
    getAccountByIdSrvc: Function;
}
export interface IAccountsModel {
    user_id?: string;
    group_id?: string;
    firstname: string;
    lastname: string;
}
export interface IAccountsDeleteModel {
    user_id: string;
    group_id: string;
}
