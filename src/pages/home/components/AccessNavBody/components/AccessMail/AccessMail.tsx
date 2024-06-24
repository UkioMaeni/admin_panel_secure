import { FC, useEffect, useState } from "react"

import './AccessMail.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../../store/customHooks/customReactReduxHooks";
import axios from "axios";
import { config } from "../../../../../../config/config";
import { editActiveMail } from "../../../../../../store/slices/navSlice";

type AccessItem={
    login:string,
    id:number
}

const AccessMail:FC =()=>{
    const navigate = useNavigate();
    const accessList:Array<AccessItem>=[
        {login:'asdda@test.ru',id:0},
        {login:'adwsd@test.ru',id:1},
        {login:'asaw2d@test.ru',id:2}
    ];
    const [variableAccess,setVariableAccess]=useState<number>(-1)
    const [mail,setMail]=useState<string>("");
    const dispatch=useAppDispatch()
    const {activeMail}=useAppSelector((state)=>state.navSlice);

    const editActiveMails=async()=>{
        try {
            const result=await axios.put(
                config.baseHttpUrl+"/admin/active_mail",
                {
                    "mail":mail
                }
            )
            //console.log(result.data);
            getActiveMail();
        } catch (error) {
            console.log(error);
            
        }
    }
    const getActiveMail=async()=>{
        try {
            const result=await axios.get(
                config.baseHttpUrl+"/admin/active_mail",
            )
            dispatch(editActiveMail(result.data))
            setMail(result.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{

        if(!activeMail) getActiveMail();
        if(activeMail) setMail(activeMail)
    },[])

    return(
        <div className="access_admin">
            <div>
                <div>Активная почта</div>
                <br/>
                <div className="access_admin_list">
                    {activeMail}
                </div>
            </div>
            {variableAccess!=-1?(
                <div className="access_admin_info">
                    <div>{accessList[variableAccess].login}</div>
                    {/* <div onClick={deleteAccess} className="access_admin_btn">Удалить</div> */}
                </div>
            ):<div className="access_admin_info"/>}
            <div className="access_admin_add">
                <div className="access_admin_add_title">Изменение почты</div>
                <div className="input_home">{"Почта"}</div>
                <input value={mail} className="input input_home" onChange={(e)=>setMail(e.target.value)}/>
                <br/>
                <div onClick={editActiveMails} className="access_admin_btn bgblue">Сохранить</div>
            </div>
        </div>
    )
}

export default AccessMail;