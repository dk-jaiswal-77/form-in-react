export default function ListEmployee({employee}){
    return(
        <tr>
            <td>{employee.name}</td>
            <td>{employee.age}</td>
            <td>{employee.address}</td>
            <td>{employee.department}</td>
            <td>{employee.salary}</td>
            <td>{employee.maritalStatus}</td>
        </tr>
    );
}