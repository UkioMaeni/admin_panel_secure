import { FC, useState } from "react"

import './AccessNavBody.css';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/customHooks/customReactReduxHooks";
import AccessAdmin from "./components/AccessAdmin/AccessAdmin";
import AccessMail from "./components/AccessMail/AccessMail";
import AccessSpecials from "./components/AccessSpecials/AccessSpecials";

const AccessNavBody:FC =()=>{
    const navigate = useNavigate();
    const {currentTitleForAccess}=useAppSelector(state=>state.navSlice)
    if(currentTitleForAccess=="В админ панель"){
        return(
            <AccessAdmin/>
        )
    }
    if(currentTitleForAccess=="Почта"){
        return(
            <AccessMail/>
        )
    }
    if(currentTitleForAccess=="Специалисты ПБ"){
        return(
            <AccessSpecials/>
        )
    }
   
    return(
        <div className="access_nav">
           
        </div>
    )
}

export default AccessNavBody;