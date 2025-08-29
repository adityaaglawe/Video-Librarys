import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function UserLogin(){

    const [users, setUsers] = useState([{UserId:'',UserName:'',Password:'',Email:'',Mobile:''}]);

    const [cookies, setCookie, removeCookie]=useCookies(['username']);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId:'',
            Password:''
        },
        onSubmit:(user)=>{
            axios.get(`http://127.0.0.1:5050/get-users`)
            .then(response=>{
                var result = response.data.find(item=> item.UserId===user.UserId);
                if(result){
                    if(result.Password===user.Password){
                        setCookie('username',result.UserName);
                        navigate('/user-dashboard');
                    }else{
                        alert('Invalid Password');
                    }
                } else{
                    alert('Invalid User Id');
                }
            })
        }
    })

    return(
        <div className="d-flex justify-content-center justify-align-content-md-end  align-items-center container-fluid" style={{height:'100vh'}}>
            <div className="bg-light p-4 m-4 w-25 container-fluid">
            <h3 className="bi bi-person">User Login</h3>
            <form action="" onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User ID</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} className="form-control" name="Password" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100">Login</button>
                <div className="my-2">
                    <Link to="/user-register">New User Register</Link>
                </div>
            </form>
            
        </div>
        </div>
    )
}