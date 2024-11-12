import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import ClientForm from "./ClientForm";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);
  const [currentClient, setCurrentClient] = useState(null); // Состояние для редактируемого клиента

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const deleteClient = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/clients/${id}`);
      fetchClients(); // Обновляем список после удаления
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleSaveClient = async (client) => {
    try {
      if (editingClientId) {
        await axios.put(
          `http://localhost:8080/clients/${editingClientId}`,
          client
        );
      } else {
        await axios.post("http://localhost:8080/clients", client);
      }
      fetchClients();
      setShowForm(false);
      setEditingClientId(null);
      setCurrentClient(null); // Очистка данных клиента
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  const handleEditClient = async (id) => {
    setEditingClientId(id);
    setShowForm(true);
    try {
      const response = await axios.get(`http://localhost:8080/clients/${id}`);
      setCurrentClient(response.data); // Загружаем данные клиента для редактирования
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  const handleAddClient = () => {
    setEditingClientId(null);
    setCurrentClient(null); // Очистка данных при добавлении нового клиента
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingClientId(null);
    setCurrentClient(null); // Очистка данных клиента при отмене
  };

  return (
    <div>
      <h2>Список клиентов</h2>
      <Button variant="primary" onClick={handleAddClient}>
        Добавить клиента
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Паспортная серия</th>
            <th>Номер паспорта</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.first_name}</td>
              <td>{client.last_name}</td>
              <td>{client.father_name}</td>
              <td>{client.passport_seria}</td>
              <td>{client.passport_number}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditClient(client.id)}
                  className="mr-2"
                >
                  Редактировать
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteClient(client.id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Модальное окно для добавления/редактирования клиента */}
      <Modal show={showForm} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingClientId ? "Редактировать клиента" : "Добавить клиента"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientForm
            client={currentClient} // Передаем данные клиента для редактирования
            onSubmit={handleSaveClient}
            onCancel={handleCancel}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Clients;
