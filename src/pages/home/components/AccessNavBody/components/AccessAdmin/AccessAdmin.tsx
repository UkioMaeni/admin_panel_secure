import { FC, useEffect, useState } from "react"

import './AccessAdmin.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../../../../../config/config";
import { useAppDispatch, useAppSelector } from "../../../../../../store/customHooks/customReactReduxHooks";
import { editAdmins } from "../../../../../../store/slices/navSlice";

type AccessItem={
    login:string,
    id:number
}

const AccessAdmin:FC =()=>{
    const navigate = useNavigate();
    const accessList:Array<AccessItem>=[
        {login:'root',id:0},
        {login:'rooted',id:1},
        {login:'rootss',id:2}
    ];
    const [variableAccess,setVariableAccess]=useState<number>(-1)
    const [login,setLogin]=useState<string>("");
    const [pass,setPass]=useState<string>("");
    const dispatch=useAppDispatch()
    const {adminsPanel}=useAppSelector((state)=>state.navSlice);

    const deleteAccess=async()=>{
        try {
            const result=await axios.delete(
                config.baseHttpUrl+"/admin/admin_list",
                {
                    data:{
                        "id":adminsPanel[variableAccess].id
                    }
                }
            )
            //console.log(result.data);
            getAdmins();
        } catch (error) {
            console.log(error);
            
        }
    }
    const addAccess=async()=>{
        try {
            const result=await axios.post(
                config.baseHttpUrl+"/admin/admin_list",
                {
                    login:login,
                    pass:pass
                }
            )
            //console.log(result.data);
            getAdmins()
            setLogin("")
            setPass("")
        } catch (error) {
            console.log(error);
            
        }
    }

    const getAdmins=async()=>{
        try {
            const result=await axios.get(
                config.baseHttpUrl+"/admin/admin_list",
            )
            //console.log(result.data);
            dispatch(editAdmins(result.data))
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        if(adminsPanel.length==0) getAdmins()
    },[])

    return(
        <div className="access_admin">
            <div>
                <div>Список лиц</div>
                <br/>
                <div className="access_admin_list">
                    {adminsPanel.map((element,index)=>{
                        return <div key={index} onClick={()=>setVariableAccess(index)} className={`${variableAccess==index?"variable_item":""} access_admin_list_item`}>{element.login}</div>
                    })}
                    
                </div>
            </div>
            {variableAccess!=-1?(
                <div className="access_admin_info">
                    <div>{adminsPanel[variableAccess].login}</div>
                    <div onClick={()=>deleteAccess()} className="access_admin_btn">Удалить</div>
                </div>
            ):<div className="access_admin_info"/>}
            <div className="access_admin_add">
                <div className="access_admin_add_title">Добавление нового пользователя</div>
                <div className="input_home">{"Логин"}</div>
                <input value={login} className="input input_home" onChange={(e)=>setLogin(e.target.value)}/>
                <div className="input_home">{"Пароль"}</div>
                <input type={"password"} value={pass} className="input input_home" onChange={(e)=>setPass(e.target.value)}/>
                <br/>
                <div onClick={addAccess} className="access_admin_btn bgblue">Добавить</div>
            </div>
        </div>
    )
}

export default AccessAdmin;