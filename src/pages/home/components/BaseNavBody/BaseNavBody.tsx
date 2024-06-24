import { FC, useEffect, useRef, useState } from "react"

import './BaseNavBody.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/customHooks/customReactReduxHooks";
import axios, { AxiosError } from "axios";
import { config } from "../../../../config/config";
import { CircleLoader } from "react-spinners";
import { editDbCounter } from "../../../../store/slices/navSlice";

const BaseNavBody:FC =()=>{
    const navigate = useNavigate();
    const {currentTitleForAccess}=useAppSelector(state=>state.navSlice)
    const [selectedFile, setSelectedFile] = useState<FileList |null>(null);
    const [error, setError] = useState<string >("");
    const [upload, setUpload] = useState<boolean>(false);
    const inputRef= useRef<HTMLInputElement >(null);
    const dispatch=useAppDispatch()
    const {dbcounter}=useAppSelector((state)=>state.navSlice);
    const getCount=async()=>{
        try {
            const result=await axios.get(
                config.baseHttpUrl+"/admin/dblist",
            )
            //console.log(result.data);
            dispatch(editDbCounter(result.data))
        } catch (error) {
            console.log(error);
            
        }
        

    }

    const sendFile=async()=>{
        setError("")
        if(!selectedFile){
            return;
        }
        const fromData = new FormData()
        fromData.append("file",selectedFile[0])
        setUpload(true)
        try {
            const result=await axios.post(
                config.baseHttpUrl+"/admin/update_db",
                fromData
            )
            setError("Успешно")
            inputRef.current!.value=""
            setSelectedFile(null)
            getCount()
        } catch (error) {
            console.log(error);
            
            if (error instanceof AxiosError){
                console.log(error.response?.data);
                if(error.response&&typeof(error.response.data)=='string' ){
                    setError(error.response.data)
                }
            } else{
                setError("Неизвестная ошибка")
            }
            
        }
        
        setUpload(false)
    }

    useEffect(()=>{
        if(selectedFile){
            setError("");
        }
        
    },[selectedFile])

    useEffect(()=>{
        if(!dbcounter)getCount()
    },[])
    return(
        <div className="base_nav_body" >
            <div className="base_nav_body_info">
                <div className="title_base">В базе записей</div>
                <div className="title_base">{dbcounter}</div>
            </div>
            <div className="base_nav_body_update">
                <div className="title_base">Обновление базы данных</div>
                <div className="title_base">(Файл excel)</div>
                <input type={"file"} ref={inputRef} accept=".xlsx,.xlsb" onChange={(event) => setSelectedFile(event.target.files)} />
                <br/>
                {selectedFile?!upload?<div  onClick={sendFile} className="access_admin_btn bgblue">Отправить</div>:<CircleLoader/>:null}
                {error?<div>{error}</div>:null}
            </div>
        </div>
    )
}

export default BaseNavBody;