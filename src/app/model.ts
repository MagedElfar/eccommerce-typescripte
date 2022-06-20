
// export default abstract class  {
//     protected db:DBService

//     constructor(id:number , table:string){
//         this.db = new DBService(table)
//     }

//     protected updateClassProperties(obj:any):void {
//         const that:any = this
//         Object.keys(obj).forEach((key:string) => {
//             that[key] = obj[key]
//         })
//         return;
//     }
// }

export default interface Model {
    id?:number | string | undefined;
    created_at?:string;
    updated_at?:string;
    [key: string]: string | any;

}