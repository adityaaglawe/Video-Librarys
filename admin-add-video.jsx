import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export function AdminAddVideo(){

    const [categories, setCategories] = useState([{categoryId:0,CategoryName:''}]);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            VideoId:0,
            Title:'',
            Url:'',
            Description:'',
            Likes:0,
            Dislikes:0,
            Views:0,
            CategoryId:0,
            Comments:['']

        },
        onSubmit: (video) => {
            axios.post(`http://127.0.0.1:5050/add-video`, video)
            .then(()=>{
                alert('Video Add Successfully...');
            })
            navigate('/admin-dashboard');
        }
    })

    useEffect(()=>{

        axios.get(`http://127.0.0.1:5050/get-categories`)
        .then(response=>{
            response.data.unshift({
                categoryId:0,
                categoryName:'Select a Category'
            })
            setCategories(response.data);
        })

    },[]);

    return(
        <div className="m-4 p-4 bg-light w-50">
            <h3>Add New Video</h3>
            <form onSubmit={formik.handleSubmit} style={{height:'400px'}} className="overflow-auto">
                <dl>
                    <dt>Video Id</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="VideoId" className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="Title" className="form-control" /></dd>
                    <dt>Url</dt>
                    <dd><input onChange={formik.handleChange} type="text" name="Url" className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd><textarea onChange={formik.handleChange} name="Description" role="2" cols="30" className="form-control" id=""></textarea></dd>
                    <dt>Likes</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="Likes" className="form-control" /></dd>
                    <dt>Dislikes</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="Dislikes" className="form-control" /></dd>
                    <dt>Viwes</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="Viwes" className="form-control" /></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="CategoryId" id="" className="form-select"  onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option key={category.categoryId} value={category.categoryId}> {category.categoryName} </option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success me-2">Add Video</button>
                <Link to="/admin-dashboard" className="btn btn-danger ms-2">Cancel</Link>
                
                
            </form>
        </div>
    )
}