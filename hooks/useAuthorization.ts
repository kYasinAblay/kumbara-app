
export default function IsAdmin(role:string){
       return {
        IsAdmin :role?.toLowerCase() === "admin"
    };
}

