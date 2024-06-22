import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { RingLoader } from 'react-spinners';
import './home.css';
import { useAppDispatch, useAppSelector } from "../../store/customHooks/customReactReduxHooks";
import { editNav } from "../../store/slices/navSlice";
import BodyNavWrapper from "./components/BodyNavWrapper/BodyNavWrapper";
import { config } from "../../config/config";
const HomePage:FC =()=>{

    const navigate = useNavigate();
    const [loading,setLoading]=useState<boolean>(true)
    
    const {currentNav}=useAppSelector(state=>state.navSlice)
    const dispatch = useAppDispatch()
    const auth=async ()=>{
            
        try {

            const data={
                "login":localStorage.getItem("login"),
                "pass":localStorage.getItem("pass")
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
            console.log(await response.json());
            setLoading(false)
        } catch (error) {
            navigate('/auth');
            console.log(error);
            
        }
        
    }

  useEffect(() => {
    auth()
    
  }, []);

    return(
        <div>
         {
            loading
            ? <div className="loader">
                <RingLoader />
            </div>
            :<div className="home">
                <div className="nav">
                    <div className="nav_current_title">{currentNav}</div>
                    <div onClick={()=>dispatch(editNav("Доступы"))} style={{background:currentNav== "Доступы"?'rgb(31, 141, 141)':'rgb(42, 48, 48)'}} className="nav_title">Доступы</div>
                    <div onClick={()=>dispatch(editNav("База"))} style={{background:currentNav== "База"?'rgb(31, 141, 141)':'rgb(42, 48, 48)'}} className="nav_title">База</div>
                </div>
                <div className="body_nav">
                    <BodyNavWrapper />
                </div>
            </div>
         }   
        </div>
    )
}

export default HomePage;