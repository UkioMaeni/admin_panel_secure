import { FC, useState } from "react"
import myImage from '../../assets/auth_phone.png';
import './auth.css';
import { useNavigate } from "react-router-dom";
import { config } from "../../config/config";
const AuthPage:FC =()=>{
    const navigate = useNavigate();

    const [login,setLogin]=useState<string>("")
    const [pass,setPass]=useState<string>("")

    const auth=async ()=>{
        try {
            const data={
                "login":login,
                "pass":pass
            }
            const response=await fetch(
                config.baseHttpUrl+"/admin/auth",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                      },
                    body:JSON.stringify(data)
                }
            )
            if(!response.ok){
                throw response;
                
            }
             localStorage.setItem("login",login);
             localStorage.setItem("pass",pass);
            navigate("/home")
            console.log(await response.json());

        } catch (error) {
            console.log(error);
            
        }
        
    }

    return(
        <div className="auth">
            <div className="auth_view">
                <div className="flex1 center">
                    <img className="image" src={myImage} ></img>
                </div>
                <div className="flex1 auth_data">
                    <div className="input_title">{"Login"}</div>
                    <input className="input" maxLength={15} value={login} onChange={(e)=>setLogin(e.target.value)}/>
                    <br/>
                    <div className="input_title">{"Password"}</div>
                    <input className="input" maxLength={25} type={"password"} value={pass} onChange={(e)=>setPass(e.target.value)}/>
                    <br/>
                    <div className="button center" onClick={auth}>
                        <div className="button_text">
                            {"Войти"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;