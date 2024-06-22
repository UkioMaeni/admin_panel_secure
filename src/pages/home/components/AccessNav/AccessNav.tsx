import { FC, useState } from "react"

import './AccessNav.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/customHooks/customReactReduxHooks";
import { editAccessTitle } from "../../../../store/slices/navSlice";
const AccessNav:FC =()=>{
    const navigate = useNavigate();

    const {currentTitleForAccess}=useAppSelector(state=>state.navSlice)
    const dispatch = useAppDispatch()
    const [pass,setPass]=useState<string>("")


    return(
        <div className="access_nav">
            <div className="togle_access">
                <div className={`${currentTitleForAccess=="В админ панель"?"togle_item_variable":"togle_item"} center`} onClick={()=>dispatch(editAccessTitle("В админ панель"))}>В админ панель</div>
                <div className={`${currentTitleForAccess=="Почта"?"togle_item_variable":"togle_item"} center`} onClick={()=>dispatch(editAccessTitle("Почта"))} >Почта</div>
                <div className={`${currentTitleForAccess=="Специалисты ПБ"?"togle_item_variable":"togle_item"} center`} onClick={()=>dispatch(editAccessTitle("Специалисты ПБ"))}>Специалисты ПБ</div>
            </div>
        </div>
    )
}

export default AccessNav;