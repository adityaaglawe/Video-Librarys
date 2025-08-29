import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";

export function AdminEditVideo(){
    
    const [categories, setCategories] = useState([{categoryId:0,CategoryName:''}]);

    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Links:0, Dislinkes:0, Views:0, Comments:[], Category:0}]);

    let params = useParams();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            VideoId: videos[0].VideoId,
            Title: videos[0].Title,
            Url: videos[0].Url,
            Description: videos[0].Description,
            Likes: videos[0].Likes,
            Dislinkes: videos[0].Dislinkes,
            Views: videos[0].Views,
            CategoryId: videos[0].CategoryId
        },
        onSubmit: (values)=>{
            axios.put(`http://127.0.0.1:5050/edit-video/${params.id}`, values);
            alert('Video Edited Successfully...');
            navigate('/admin-dashboard');
        },
        enableReinitialize:true

    });

    function LoadCategories(){
        axios.get(`http://127.0.0.1:5050/get-categories`)
        .then(response=>{
            response.data.unshift({categoryId:-1,categoryName:'Select a Category'});
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();

        axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
            console.log(response.data);
        })
    },[]);
    return(
        <div className="bg-light p-2 m-3 w-50">
            <h3>Edit Video</h3>
            <form onSubmit={formik.handleSubmit} style={{height:'400px'}} className="overflow-auto">
                <dl>
                    <dt>Video Id</dt>
                    <dd><input onChange={formik.handleChange} type="number" value={formik.values.VideoId} name="VideoId" className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input onChange={formik.handleChange} type="text" value={formik.values.Title} name="Title" className="form-control" /></dd>
                    <dt>Url</dt>
                    <dd><input onChange={formik.handleChange} type="text" value={formik.values.Url} name="Url" className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd><textarea onChange={formik.handleChange} name="Description" value={formik.values.Description} role="2" cols="30" className="form-control" id=""></textarea></dd>
                    <dt>Likes</dt>
                    <dd><input onChange={formik.handleChange} type="number" value={formik.values.Likes} name="Likes" className="form-control" /></dd>
                    <dt>Dislikes</dt>
                    <dd><input onChange={formik.handleChange} type="number" value={formik.values.Dislinkes} name="Dislikes" className="form-control" /></dd>
                    <dt>Viwes</dt>
                    <dd><input onChange={formik.handleChange} type="number" value={formik.values.Views} name="Viwes" className="form-control" /></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="CategoryId" value={formik.values.CategoryId} id="" className="form-select"  onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option key={category.categoryId} value={category.categoryId}> {category.categoryName} </option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success me-2">Save Video</button>
                <Link to="/admin-dashboard" className="btn btn-danger ms-2">Cancel</Link>
                
                
            </form>
        </div>
    )
}