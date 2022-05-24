import React, { useState, useMemo } from 'react';
import Pagination from './Components/Pagination';
import './App.css';

let PageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const onSubmitForm = async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch(`http//:localhost:3000/users/?name=${name}`);
      const parseResponse = await response.json();
      setUsers(parseResponse);

    }catch(err){
      console.error(err.message);
    }

  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <>

    <div className="top">
      <h3>Data Table</h3>
      <form onSubmit={onSubmitForm}>
      <input type="text" Placeholder="Search.." className="Search" value={name} onChange={(e) =>setName(e.target.value)}/>
      <button>Submit</button>
      </form>
      
    </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Gender</th>
          </tr>

        </thead>
        <tbody>
              //displaying data
          {currentTableData(users).map(user => {
            return (
              <tr>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {users.length === 0 && <p> No Results Found!!</p>}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
