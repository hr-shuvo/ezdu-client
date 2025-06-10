import {create} from "zustand";


// type LoginStatusState = {
//     isLoggedIn:boolean;
//     login:() => void;
//     logout:() => void;
// }
// export const userLoginStatus = create<LoginStatusState>((set) =>({
//     isLoggedIn:false,
//     login:() =>set({isLoggedIn:true}),
//     logout:() =>set({isLoggedIn:false}),

// }));