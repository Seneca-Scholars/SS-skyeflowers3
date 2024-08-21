import React, { useState, useEffect } from 'react';

function Table() {
const [data, setData] = useState([]);

useEffect(() => {
    fetch("https://reqres.in/api/users")
    .then(response => {
       if (response.ok) {
        return response.json();
       } else {
        throw new Error('Network response unsuccessful');
    }})
    .then(data => {
        console.log(data);
        setData(data.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
  })

    return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Picture</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr>
              <td>{user.first_name} {user.last_name}</td>
              <td><img src={user.avatar} width="75"/></td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;