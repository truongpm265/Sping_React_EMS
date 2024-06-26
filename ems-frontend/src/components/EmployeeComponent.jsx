import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeComponent() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams()
    const [errors, setErrors] = useState({
        name: '',
        email: '',
    })

    const navigator = useNavigate();

    useEffect(() =>{
        if(id){
            getEmployee(id).then((response)=>{
                setName(response.data.name);
                setEmail(response.data.email);
            }).catch(error =>{
                console.error(error)
            } )
        }
    }, [id])


    // const handleName = (e) => setName(e.target.value);
    // const handleEmail = (e) => setEmail(e.target.value);

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if (validateForm()) {
            const employee = { name, email }
            console.log(employee);

            if(id){
                updateEmployee(id, employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error =>{
                    console.error(error);
                })
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error=>{
                    console.error(error);
                })
            }
        }
    };

    function saveEmployee(e){
        e.preventDefault();
        if(validateForm()){
            const employee = {name,email}
            console.log(employee)
            createEmployee(employee).then((response)=>{
                console.log(response.data);
                navigator('/employees')
            })
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCoppy = { ...errors }

        if(name.trim()) {
            errorsCoppy.name = '';
            valid = true;
        }else{
            errorsCoppy.name = "Name is required"
            valid = false;
        }
        if(email.trim()) {
            errorsCoppy.email = '';
            valid = true;
        } else {
            errorsCoppy.email = "Email is required"
            valid = false;
        }
        setErrors(errorsCoppy)
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }
    return (
        <div className='containter'>
            <br></br>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form action="">
                            <div className='form-group mb-2'>
                                <label className="form-label">Name: </label>
                                <input type="text"
                                    placeholder='Enter Employee Name'
                                    name='name' value={name}
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </input>
                                {errors.name && <div className='invalid-feedback' >{errors.name} </div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className="form-label">Email: </label>
                                <input type="text"
                                    placeholder='Enter Employee Email'
                                    name='name' value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                >

                                </input>
                                {errors.email && <div className='invalid-feedback' >{errors.email} </div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default EmployeeComponent