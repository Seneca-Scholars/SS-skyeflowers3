import React, { useState, useEffect } from 'react';

function Table() {
const [data, setData] = useState([]);

useEffect(() => {
    fetch("/api/items")
    .then(response => {
       if (response.ok) {
        return response.json();
       } else {
        throw new Error('Network response unsuccessful');
    }})
    .then(data => {
        console.log(data);
        setData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
  },[])

    return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr>
              <td>{data.id}</td>
              <td>{data.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;