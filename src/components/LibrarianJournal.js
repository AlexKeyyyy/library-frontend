import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const LibrarianJournal = () => {
  const [entries, setEntries] = useState([]); // Записи журнала
  const [clients, setClients] = useState([]);
  const [books, setBooks] = useState([]);
  const [showIssueModal, setShowIssueModal] = useState(false); // Модальное окно для выдачи книги
  const [showReturnModal, setShowReturnModal] = useState(false); // Модальное окно для приема книги
  const [newEntry, setNewEntry] = useState({
    client_id: "",
    book_id: "",
    date_end: "",
  });
  const [returnJournalId, setReturnJournalId] = useState(null);
  const [fine, setFine] = useState(null);

  useEffect(() => {
    fetchJournalEntries();
    fetchClients();
    fetchBooks();
  }, []);

  const fetchFine = async (journalId) => {
    try {
      console.log(journalId);
      const response = await axios.post("http://localhost:8080/journal/fine", {
        journal_id: parseInt(journalId, 10),
      });
      setFine(response.data.fine); // Получаем штраф из ответа
      setReturnJournalId(journalId);
      setShowReturnModal(true); // Показываем модальное окно
    } catch (error) {
      console.error("Error fetching fine:", error);
    }
  };

  const fetchJournalEntries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/journal"); // Предполагается, что этот маршрут отображает записи
      setEntries(response.data || []);
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/clients/all");
      setClients(response.data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/books/all");
      setBooks(response.data || []);
      console.log(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Выдача книги
  const issueBook = async () => {
    const formattedDate = new Date(newEntry.date_end)
      .toISOString()
      .split("T")[0];
    console.log(formattedDate);

    console.log("Отправляемые данные:", {
      book_id: newEntry.book_id,
      client_id: newEntry.client_id,
      date_end: formattedDate,
    });

    try {
      await axios.post("http://localhost:8080/journal/issue", {
        book_id: parseInt(newEntry.book_id, 10),
        client_id: newEntry.client_id,
        date_end: formattedDate,
      });
      fetchJournalEntries();
      setShowIssueModal(false);
      setNewEntry({ client_id: "", book_id: "", date_end: "" });
    } catch (error) {
      console.error("Error issuing book:", error);
    }
  };

  // Прием книги
  const returnBook = async (journalId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/journal/return",
        { journal_id: journalId }
      );
      setFine(response.data.fine);
      //setReturnJournalId(null);
      setShowReturnModal(false);
      fetchJournalEntries();
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  // Получение day_count для выбранной книги и расчет даты возврата
  const handleBookSelect = async (bookId) => {
    const selectedBook = books.find((book) => book.id === parseInt(bookId, 10));
    console.log(selectedBook);

    if (selectedBook) {
      try {
        const response = await axios.get(
          `http://localhost:8080/book_types/${selectedBook.type_id}`
        );
        const { day_count } = response.data;

        const currentDate = new Date();
        const returnDate = new Date(currentDate);
        returnDate.setDate(currentDate.getDate() + day_count);

        setNewEntry((prev) => ({
          ...prev,
          book_id: bookId,
          date_end: returnDate.toISOString().split("T")[0], // Форматируем дату
        }));
      } catch (error) {
        console.error("Error fetching day_count:", error);
      }
    }
  };

  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    if (name === "book_id") {
      handleBookSelect(value);
    } else {
      setNewEntry((prev) => ({
        ...prev,
        [name]:
          name === "client_id" || name === "book_id"
            ? parseInt(value, 10)
            : value, // Преобразуем в int
      }));
    }
  };

  return (
    <div>
      <h2>Журнал библиотекаря</h2>
      <Button variant="primary" onClick={() => setShowIssueModal(true)}>
        Выдать книгу
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Клиент</th>
            <th>Книга</th>
            <th>Дата выдачи</th>
            <th>Дата возврата</th>
            <th>Дата фактического возврата</th>
            <th>Штраф</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const client = clients.find(
              (client) => client.id === entry.client_id
            );
            const book = books.find((book) => book.id === entry.book_id);
            return (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>
                  {client
                    ? `${client.last_name} ${client.first_name}`
                    : "Не найден"}
                </td>
                <td>{book ? book.name : "Не найдено"}</td>
                <td>{entry.date_beg}</td>
                <td>{entry.date_end}</td>
                <td>{entry.date_ret || "Не возвращена"}</td>
                <td>{entry.fine > 0 ? `${entry.fine} руб.` : `-`}</td>
                <td>
                  {entry.date_ret === "Не возвращена" && (
                    <Button
                      variant="success"
                      onClick={() => {
                        //setReturnJournalId(entry.id);
                        //setShowReturnModal(true);
                        fetchFine(entry.id);
                      }}
                    >
                      Принять книгу
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* Модальное окно для выдачи книги */}
      <Modal show={showIssueModal} onHide={() => setShowIssueModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Выдать книгу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="clientId">
              <Form.Label>Выберите клиента</Form.Label>
              <Form.Control
                as="select"
                name="client_id"
                value={newEntry.client_id}
                onChange={handleIssueChange}
                required
              >
                <option value="">Выберите клиента</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.last_name} {client.first_name} {client.father_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="bookId">
              <Form.Label>Выберите книгу</Form.Label>
              <Form.Control
                as="select"
                name="book_id"
                value={newEntry.book_id}
                onChange={handleIssueChange}
                required
              >
                <option value="">Выберите книгу</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="dateEnd">
              <Form.Label>Дата окончания пользования</Form.Label>
              <Form.Control
                type="date"
                name="date_end"
                value={newEntry.date_end}
                onChange={handleIssueChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowIssueModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={issueBook}>
            Выдать книгу
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для подтверждения приёма книги */}
      <Modal show={showReturnModal} onHide={() => setShowReturnModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Принять книгу</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Вы уверены, что хотите принять эту книгу?</p>
          {fine !== null && <p>Штраф за просрочку: {fine} рублей</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReturnModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={() => returnBook(returnJournalId)}>
            Принять книгу
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LibrarianJournal;
