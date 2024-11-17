import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [bookTypes, setBookTypes] = useState([]); // Список типов книг
  const [showForm, setShowForm] = useState(false);
  const [newBook, setNewBook] = useState({
    name: "",
    cnt: "",
    type_id: "",
  });
  const [editingBookId, setEditingBookId] = useState(null); // ID редактируемой книги

  useEffect(() => {
    fetchBooks();
    fetchBookTypes(); // Загружаем список типов книг
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/books");
      setBooks(response.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchBookTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/book_types"); // Путь к типам книг
      setBookTypes(response.data || []);
    } catch (error) {
      console.error("Error fetching book types:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      fetchBooks(); // Обновляем список после удаления
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const addBook = async () => {
    try {
      await axios.post("http://localhost:8080/books", newBook);
      fetchBooks(); // Обновляем список после добавления
      setShowForm(false);
      clearForm();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const updateBook = async () => {
    try {
      await axios.put(`http://localhost:8080/books/${editingBookId}`, newBook);
      fetchBooks(); // Обновляем список после редактирования
      setShowForm(false);
      clearForm();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleEditBook = (book) => {
    setEditingBookId(book.id);
    setNewBook({
      name: book.name,
      cnt: book.cnt,
      type_id: book.type_id,
    });
    setShowForm(true); // Открываем форму с актуальными данными книги
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: name === "cnt" || name === "type_id" ? Number(value) : value,
    }));
  };

  const clearForm = () => {
    setNewBook({ name: "", cnt: "", type_id: "" });
    setEditingBookId(null);
  };

  const handleSave = () => {
    if (editingBookId) {
      updateBook(); // Редактируем существующую книгу
    } else {
      addBook(); // Добавляем новую книгу
    }
  };

  const getTypeName = (typeId) => {
    const type = bookTypes.find((t) => t.id === typeId);
    return type ? type.type : "Неизвестный тип";
  };

  return (
    <div>
      <h2>Список книг</h2>
      <Button
        variant="primary"
        onClick={() => {
          setShowForm(true);
          clearForm();
        }}
        className="mb-3"
      >
        Добавить книгу
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Количество</th>
            <th>Тип книги</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.cnt}</td>
              <td>{getTypeName(book.type_id)}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditBook(book)}
                  className="mr-2"
                >
                  Редактировать
                </Button>
                <Button variant="danger" onClick={() => deleteBook(book.id)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Модальное окно для добавления/редактирования книги */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingBookId ? "Редактировать книгу" : "Добавить книгу"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBookName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название книги"
                name="name"
                value={newBook.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBookCount">
              <Form.Label>Количество</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите количество"
                name="cnt"
                value={newBook.cnt}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBookType">
              <Form.Label>Тип книги</Form.Label>
              <Form.Control
                as="select"
                name="type_id"
                value={newBook.type_id}
                onChange={handleChange}
                required
              >
                <option value="">Выберите тип</option>
                {bookTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.type}{" "}
                    {/* Предполагается, что в типах книг есть поле name */}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Books;
