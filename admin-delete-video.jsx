import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";


export function AdminDeleteVideo(){

     const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Links:0, Dislinkes:0, Views:'', Comments:[], Category:0}]);

    let params = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        

        axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
            console.log(response.data);
        })
    },[]);

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`);
        navigate('/admin-dashboard');
    }

    
    return(
        <div className=" bg-light m-3 p-3 w-50">
            <h3>Are you sure, want to delete?</h3>
            <dl>
                <dt>Title</dt>
                <dd>{videos[0].Title} </dd>
                <dt>Description</dt>
                <dd>{videos[0].Description} </dd>
            </dl>
            <button onClick={handleDeleteClick} className="btn btn-danger">yes</button>
            <Link to="/admin-dashboard" className="btn btn-warning ms-2">No</Link>
        </div>
    )
}