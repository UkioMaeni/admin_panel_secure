import { FC, useEffect, useState } from "react"

import './AccessSpecials.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../../store/customHooks/customReactReduxHooks";
import axios from "axios";
import { config } from "../../../../../../config/config";
import { editPbList } from "../../../../../../store/slices/navSlice";

type AccessItem={
    login:string,
    id:number
}

const AccessSpecials:FC =()=>{
    const navigate = useNavigate();

    const [variableAccess,setVariableAccess]=useState<number>(-1)
    const [login,setLogin]=useState<string>("");
    const [pass,setPass]=useState<string>("");
    const dispatch=useAppDispatch()
    const {pbList}=useAppSelector((state)=>state.navSlice);

    const deleteAccess=async()=>{
        try {
            const result=await axios.delete(
                config.baseHttpUrl+"/admin/pb_list",
                {
                    data:{
                        "id":pbList[variableAccess].id
                    }
                }
            )
            
            getAdmins();
            setVariableAccess(-1)
        } catch (error) {
            console.log(error);
            
        }
    }
    const addAccess=async()=>{
        try {
            const result=await axios.post(
                config.baseHttpUrl+"/admin/pb_list",
                {
                    login:login,
                    pass:pass
                }
            )
            
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
                config.baseHttpUrl+"/admin/pb_list",
            )
            
            dispatch(editPbList(result.data))
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        if(pbList.length==0) getAdmins()
    },[])

    return(
        <div className="access_admin">
            <div>
                <div>Список специалистов ПБ</div>
                <br/>
                <div className="access_admin_list">
                    {pbList.map((element,index)=>{
                        return <div key={index} onClick={()=>setVariableAccess(index)} className={`${variableAccess==index?"variable_item":""} access_admin_list_item`}>{element.login}</div>
                    })}
                    
                </div>
            </div>
            {variableAccess!=-1?(
                <div className="access_admin_info">
                    <div>{pbList[variableAccess].login}</div>
                    <div onClick={deleteAccess} className="access_admin_btn">Удалить</div>
                </div>
            ):<div className="access_admin_info"/>}
            <div className="access_admin_add">
                <div className="access_admin_add_title">Добавление специалиста ПБ</div>
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

export default AccessSpecials;