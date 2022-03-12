import "./Form.css";
import {useState, useEffect} from "react";
import ListEmployee from "./ListEmployee";

export default function Form(){

    const [formData, setFormData] = useState({
        name : "",
        age : "",
        address : "",
        department : "",
        salary : "",
        maritalStatus : ""
    });

    const [employees, setEmployees] = useState([]);

    useEffect(()=>{
        setFormData({
            name : "",
            age : "",
            address : "",
            department : "",
            salary : "",
            maritalStatus : ""
        });
    }, [employees]);

    useEffect(()=>{
        getEmployees();
    },[])

    function updateChange(e){
        if((e.target.id === "married") || (e.target.id === "unmarried"))
        {
            setFormData({...formData, maritalStatus : e.target.id});
            return;
        }

        const {value, id} = e.target;
        setFormData({...formData, [id] : value});
    }

    async function getEmployees(){
        try{
            const res = await fetch("http://localhost:3001/employees");
            const res_data = await res.json();
            console.log(res_data);
            setEmployees(res_data);
        }catch(error){
            console.log(error.message);
        }
    }

    async function saveEmployee(){
        try{

            await fetch("http://localhost:3001/employees", {
                method : "POST",
                body : JSON.stringify(formData),
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            getEmployees();

        }catch(error){
            console.log(error.message);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        saveEmployee();
    }

    return(
        <div>

            <form onSubmit = {handleSubmit} >
                <div>
                    <input type="text" id="name" placeholder="enter name" value={formData.name} onChange = {updateChange} />
                </div>

                <div>
                    <input type="number" id="age" placeholder="enter age" value={formData.age} onChange = {updateChange} />
                </div>

                <div>
                    <input type="text" id="address" placeholder="enter address" value={formData.address} onChange = {updateChange} />
                </div>

                <div>
                    <select id="department" onChange = {updateChange} >
                        <option value="select">Select Department</option>
                        <option value="tech">Tech</option>
                        <option value="administration">Administration</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>

                <div>
                    <input type="text" id="salary" placeholder="salary" value={formData.salary} onChange = {updateChange} />
                </div>

                <div>
                    Marital Status: 
                    <input type="radio" name="marital_status" id="married" onChange = {updateChange} />
                    <label htmlFor="married">Married</label>

                    <input type="radio" name="marital_status" id="unmarried" onChange = {updateChange} />
                    <label htmlFor="unmarried">Unmarried</label>
                </div>

                <div>
                    <input type="submit" value="Submit Form" />
                </div>
            </form>

            <table border = "1" cellSpacing={"0"}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Marital Status</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee)=>{
                        return <ListEmployee employee = {employee} key = {employee.id} />
                    })}
                </tbody>
            </table>

        </div>
                
    );
}