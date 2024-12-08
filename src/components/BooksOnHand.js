import React, { useState, useEffect } from "react";
import axios from "axios";

const ReportsExtra = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(""); // ID выбранного клиента
  const [booksOnHand, setBooksOnHand] = useState(null);
  const [clientFine, setClientFine] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/clients/all");
      setClients(response.data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchBooksOnHand = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/reports/books-on-hand",
        {
          client_id: parseInt(selectedClient, 10),
        }
      );
      setBooksOnHand(response.data.books_on_hand);
    } catch (error) {
      console.error("Error fetching books on hand:", error);
    }
  };

  const fetchClientFine = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/reports/client-fine",
        {
          client_id: parseInt(selectedClient, 10),
        }
      );
      setClientFine(response.data.total_fine);
    } catch (error) {
      console.error("Error fetching client fine:", error);
    }
  };

  return (
    <div>
      <div>
        <h3>Число книг на руках у клиента</h3>
        <label>Выберите клиента</label>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">Выберите клиента</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.last_name} {client.first_name} {client.father_name}
            </option>
          ))}
        </select>
        <button onClick={fetchBooksOnHand} disabled={!selectedClient}>
          Посмотреть
        </button>
        {booksOnHand !== null && <p>Книг на руках: {booksOnHand}</p>}
      </div>

      <div>
        <h3>Размер штрафа конкретного клиента</h3>
        <label>Выберите клиента</label>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">Выберите клиента</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.last_name} {client.first_name} {client.father_name}
            </option>
          ))}
        </select>
        <button onClick={fetchClientFine} disabled={!selectedClient}>
          Посмотреть
        </button>
        {clientFine !== null && <p>Штраф клиента: {clientFine} рублей</p>}
      </div>
    </div>
  );
};

export default ReportsExtra;
