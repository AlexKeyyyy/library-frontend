// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import axios from 'axios';

// const ClientForm = ({ clientId, onSubmit, onCancel }) => {
//   const [client, setClient] = useState({
//     first_name: '',
//     last_name: '',
//     father_name: '',
//     passport_seria: '',
//     passport_number: '',
//   });

//   useEffect(() => {
//     if (clientId) {
//       // Если передан clientId, то загружаем данные клиента для редактирования
//       axios.get(`http://localhost:8080/clients/${clientId}`)
//         .then(response => setClient(response.data))
//         .catch(error => console.error('Error fetching client:', error));
//     }
//   }, [clientId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setClient((prevClient) => ({
//       ...prevClient,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(client);
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="firstName">
//         <Form.Label>Имя</Form.Label>
//         <Form.Control
//           type="text"
//           name="first_name"
//           value={client.first_name}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="lastName">
//         <Form.Label>Фамилия</Form.Label>
//         <Form.Control
//           type="text"
//           name="last_name"
//           value={client.last_name}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="fatherName">
//         <Form.Label>Отчество</Form.Label>
//         <Form.Control
//           type="text"
//           name="father_name"
//           value={client.father_name}
//           onChange={handleChange}
//         />
//       </Form.Group>
//       <Form.Group controlId="passportSeria">
//         <Form.Label>Серия паспорта</Form.Label>
//         <Form.Control
//           type="text"
//           name="passport_seria"
//           value={client.passport_seria}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group controlId="passportNumber">
//         <Form.Label>Номер паспорта</Form.Label>
//         <Form.Control
//           type="text"
//           name="passport_number"
//           value={client.passport_number}
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Сохранить
//       </Button>
//       <Button variant="secondary" onClick={onCancel} className="ml-2">
//         Отмена
//       </Button>
//     </Form>
//   );
// };

// export default ClientForm;

import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const ClientForm = ({ client, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    passport_seria: "",
    passport_number: "",
  });

  // Если client передан, устанавливаем его данные как начальные
  useEffect(() => {
    if (client) {
      setFormData({
        first_name: client.first_name,
        last_name: client.last_name,
        father_name: client.father_name,
        passport_seria: client.passport_seria,
        passport_number: client.passport_number,
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Фамилия</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="fatherName">
        <Form.Label>Отчество</Form.Label>
        <Form.Control
          type="text"
          name="father_name"
          value={formData.father_name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="passportSeria">
        <Form.Label>Серия паспорта</Form.Label>
        <Form.Control
          type="text"
          name="passport_seria"
          value={formData.passport_seria}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="passportNumber">
        <Form.Label>Номер паспорта</Form.Label>
        <Form.Control
          type="text"
          name="passport_number"
          value={formData.passport_number}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Сохранить
      </Button>
      <Button variant="secondary" onClick={onCancel} className="ml-2">
        Отмена
      </Button>
    </Form>
  );
};

export default ClientForm;
