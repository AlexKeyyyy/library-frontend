import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const TopClientsFines = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchTopClients();
  }, []);

  const fetchTopClients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/reports/top-clients-fines"
      );
      setClients(response.data || []);
    } catch (error) {
      console.error("Error fetching clients with fines:", error);
    }
  };

  return (
    <div>
      <h2>Клиенты с наибольшими штрафами</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Имя клиента</th>
            <th>Общая сумма штрафов</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.client_name}</td>
              <td>{client.total_fine} руб.</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TopClientsFines;
