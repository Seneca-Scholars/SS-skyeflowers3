import React, { useState, useEffect } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: null, 
    name: '', 
  });

  useEffect(() => {
    fetch("/api/items")
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
  
    fetch('/api/items', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        name: formData.name,
      }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      };
    })
    .then(newItem => {
      setData(prevData => [...prevData, newItem]);
      setFormData({ id: null, name: '' });
      console.log(data);
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
  };

  const handleDelete = (id) => {
    fetch(`/api/items/${id}`, {
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
      setData(prevData => prevData.filter(item => item.id !== id));
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
        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td><button onClick={() => handleDelete(data.id)}>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;