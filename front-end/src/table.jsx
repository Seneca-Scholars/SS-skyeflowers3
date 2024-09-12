import React, { useState, useEffect } from 'react';
import './App.css';

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
        setData(data);
        console.log(data);
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

    if (formData.id) {
      fetch (`/api/users/${formData.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response unsuccessful');
        }
      })
      .then(updtdUser => {
        setData(prevData => prevData.map(user=> user.id === updtdUser.id ? updtdUser : user));
        setFormData({ id: null, name: '', phone: '', address: '' });
      })
      .catch(error => {
        console.error('Error updating data:', error);
      })

    } else {

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
   }
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

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
    });
  };

  return (
    <div id="container">
      <div>
      <form onSubmit={handleSubmit} id="submissionForm">
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
            Phone #:
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
        <div>
        <button id="submitButton" type="submit">Submit</button>
        </div>
      </form>
      </div>

      <div>
      <table id="myTable">
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
              <td><button onClick={() => handleDelete(user.id)}>delete</button>
              <button onClick={() => handleEdit(user)}>edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Table;