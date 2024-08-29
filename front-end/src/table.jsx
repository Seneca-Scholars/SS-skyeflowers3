import React, { useState, useEffect } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: null, 
    name: '', 
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetch("/api/users")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response unsuccessful');
        }
      })
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData, 
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch('/api/users', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      };
    })
    .then(newUser => {
      setData(prevData => [...prevData, newUser]);
      setFormData({ id: null, name: '', phone: '', address: '' });
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
  };

  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, {
      method: 'DELETE', 
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(() => {
      setData(prevData => prevData.filter(user => user.id !== id));
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
  };

  return (  
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input 
              type='text' 
              name='name' 
              onChange={handleChange}
              value={formData.name} 
              required
            />
          </label>
        </div>
        <div>
          <label>
            Phone:
            <input 
              type='text' 
              name='phone' 
              onChange={handleChange}
              value={formData.phone} 
              required
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input 
              type='text' 
              name='address' 
              onChange={handleChange}
              value={formData.address} 
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td><button onClick={() => handleDelete(user.id)}>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;