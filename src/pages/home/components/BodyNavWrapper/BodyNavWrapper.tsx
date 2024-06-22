import { FC, useState } from "react"

import './BodyNavWrapper.css';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/customHooks/customReactReduxHooks";
import BaseNavBody from "../BaseNavBody/BaseNavBody";
import AccessNavBody from "../AccessNavBody/AccessNavBody";
import AccessNav from "../AccessNav/AccessNav";
import BaseNav from "../BaseNav/BaseNav";
const BodyNavWrapper:FC =()=>{
    const navigate = useNavigate();

    const {currentNav}=useAppSelector(state=>state.navSlice)
    if(currentNav=="Доступы"){
        return(
            <div>
                <AccessNav/>
                <AccessNavBody/>
            </div>
        );
    }
    if(currentNav=="База"){
        return(
            <div>
                <BaseNav/>
                <BaseNavBody/>
            </div>
        );
    }
    return(
        <div className="access_nav">
           
        </div>
    )
}

export default BodyNavWrapper;