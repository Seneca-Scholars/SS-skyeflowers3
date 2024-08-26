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
    }})
    .then(data => {
        console.log(data);
        setData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
  },[]);

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
      fetch(`/api/items/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
        }), 
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(updatedItem => {
        setData(prevData => prevData.map(item => item.id === updatedItem.id ? updatedItem : item));
        setFormData({ id: null, name: '', phone: '', address: '' });
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
    } else {
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
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(newItem => {
        setData(prevData => [...prevData, newItem]);
        setFormData({ id: null, name: '' });
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
    }
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