import { FC, useState } from "react"

import './BaseNav.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/customHooks/customReactReduxHooks";
import { editAccessTitle, editBaseTitle } from "../../../../store/slices/navSlice";
const BaseNav:FC =()=>{
    const navigate = useNavigate();

    const {currentTitleForBase}=useAppSelector(state=>state.navSlice)
    
    const dispatch = useAppDispatch()
    const [pass,setPass]=useState<string>("")


    return(
        <div className="access_nav">
            <div className="togle_access">
                <div className={`${currentTitleForBase=="Основная база"?"togle_item_variable":"togle_item"} center`} onClick={()=>dispatch(editBaseTitle("Основная база"))}>Основная база</div>
                <div className={`${currentTitleForBase=="Журнал"?"togle_item_variable":"togle_item"} center`} onClick={()=>dispatch(editBaseTitle("Журнал"))}>Журнал</div>
            </div>
        </div>
    )
}

export default BaseNav;