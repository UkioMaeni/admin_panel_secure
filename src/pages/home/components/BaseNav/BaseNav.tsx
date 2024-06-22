import { FC, useState } from "react"

import './BaseNav.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/customHooks/customReactReduxHooks";
import { editAccessTitle } from "../../../../store/slices/navSlice";
const BaseNav:FC =()=>{
    const navigate = useNavigate();

    const {currentTitleForAccess}=useAppSelector(state=>state.navSlice)
    const dispatch = useAppDispatch()
    const [pass,setPass]=useState<string>("")


    return(
        <div className="access_nav">
            <div className="togle_access">
                <div className={`togle_item_variable center`} >Основная база</div>
            </div>
        </div>
    )
}

export default BaseNav;