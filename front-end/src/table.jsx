import React, { useState, useEffect } from 'react';

function Table() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: null, 
    name: '', 
    email: '',
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
        email: formData.email,
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
      setFormData({ id: null, name: '', email: '' });
      console.log(data);
    })
    .catch(error => {
      console.error('Error posting data:', error);
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
            Email:
            <input 
              type='text' 
              name='email' 
              onChange={handleChange}
              value={formData.email} 
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
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;