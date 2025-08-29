import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function AdminDashboard(){

    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Links:0, Dislinkes:0, Views:'', Comments:[], Category:0}]);

    useEffect(()=>{

        axios.get(`http://127.0.0.1:5050/get-videos`)
        .then(Response=>{
            setVideos(Response.data);
        })
    })

    return(
        <div className="bg-light p-4 m-4 ">
            <h2>Admin Dashboard</h2>
            <div className="mb-3">
                <Link to="/admin-add-video" className="btn btn-primary bi bi-camera-video">Add Video</Link>
                
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Preview </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            videos.map(video=>
                                <tr key={video.VideoId}>
                                    <td>{video.Title} </td>
                                    <td>
                                        <iframe src={video.Url} width="200px" height="100px" ></iframe>
                                    </td>
                                    <td>
                                        <Link to={`/admin-edit-video/${video.VideoId}`} className="bi bi-pen-fill me-2 btn btn-warning"></Link>
                                        <Link to={`/admin-delete-video/${video.VideoId}`} className="bi bi-trash-fill btn btn-danger"></Link>
                                    </td>

                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}