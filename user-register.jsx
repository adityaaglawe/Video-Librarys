import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
export function UserRegister(){

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId:'',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''
        },
        onSubmit:(user)=>{
            axios.post(`http://127.0.0.1:5050/register-user`, user);
            alert('User Register Successfully...');
            navigate('/user-login');
        }
    })

    return(
        <div className="d-flex justify-content-center justify-align-content-md-end  align-items-center" style={{height:'100vh'}}>
            <div className="bg-light p-4 m-4 w-25">
            <h3>Register User</h3>
            <form action="" onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User ID</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="UserId" /></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" onChange={formik.handleChange} className="form-control" name="UserName" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} className="form-control" name="Password" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} className="form-control" name="Email" /></dd>
                    <dt>Mobile No</dt>
                    <dd><input type="number" onChange={formik.handleChange} className="form-control" name="UserMobileId" /></dd>
                </dl>
                <button className="btn btn-warning w-100">Register</button>
                <div className="my-2">
                    <Link to="/user-login">Existing User Login</Link>
                </div>
                <div className="my-2">
                    <Link to="/admin-login">Admin Login</Link>
                </div>
                
            </form>
        </div>
        </div>
    )
}