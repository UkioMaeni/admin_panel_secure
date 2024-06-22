import { FC, useState } from "react"

import './AccessMail.css';
import { useNavigate } from "react-router-dom";

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
    const [login,setLogin]=useState<string>("");

    const deleteAccess=async()=>{

    }
    const addAccess=async()=>{

    }

    return(
        <div className="access_admin">
            <div>
                <div>Белый список почт</div>
                <br/>
                <div className="access_admin_list">
                    {accessList.map((element,index)=>{
                        return <div onClick={()=>setVariableAccess(index)} className={`${variableAccess==index?"variable_item":""} access_admin_list_item`}>{element.login}</div>
                    })}
                    
                </div>
            </div>
            {variableAccess!=-1?(
                <div className="access_admin_info">
                    <div>{accessList[variableAccess].login}</div>
                    <div onClick={deleteAccess} className="access_admin_btn">Удалить</div>
                </div>
            ):<div className="access_admin_info"/>}
            <div className="access_admin_add">
                <div className="access_admin_add_title">Добавление почты</div>
                <div className="input_home">{"Почта"}</div>
                <input value={login} className="input input_home" onChange={(e)=>setLogin(e.target.value)}/>
                <br/>
                <div onClick={addAccess} className="access_admin_btn bgblue">Добавить</div>
            </div>
        </div>
    )
}

export default AccessMail;