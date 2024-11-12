import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const BookTypes = () => {
  const [bookTypes, setBookTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newType, setNewType] = useState({
    type: "",
    fine: "",
    day_count: "",
  });
  const [editingTypeId, seteditingTypeId] = useState(null);

  useEffect(() => {
    fetchBookTypes();
  }, []);

  const fetchBookTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/book_types");
      setBookTypes(response.data || []);
    } catch (error) {
      console.error("Error fetching book types:", error);
    }
  };

  const deleteBookType = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/book_types/${id}`);
      fetchBookTypes(); // Обновляем список после удаления
    } catch (error) {
      console.error("Error deleting book type:", error);
    }
  };

  const addBookType = async () => {
    try {
      await axios.post("http://localhost:8080/book_types", newType);
      fetchBookTypes();
      setShowForm(false);
      clearForm();
    } catch (error) {
      console.error("Error adding book type: ", error);
    }
  };

  const updateBookType = async () => {
    try {
      await axios.put(
        `http://localhost:8080/book_types/${editingTypeId}`,
        newType
      );
      fetchBookTypes();
      setShowForm(false);
      clearForm();
    } catch (error) {
      console.error("Error updating book type: ", error);
    }
  };

  const handleEditType = (type) => {
    seteditingTypeId(type.id);
    setNewType({
      type: type.type,
      fine: type.fine,
      day_count: type.day_count,
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewType((prevType) => ({
      ...prevType,
      [name]: name === "fine" || name === "day_count" ? Number(value) : value,
    }));
  };

  const clearForm = () => {
    setNewType({ type: "", fine: "", day_count: "" });
    seteditingTypeId(null);
  };

  const handleSave = () => {
    if (editingTypeId) {
      updateBookType();
    } else {
      addBookType();
    }
  };

  return (
    <div>
      <h2>Типы книг</h2>
      <Button
        variant="primary"
        onClick={() => {
          setShowForm(true);
          clearForm();
        }}
        className="mb-3"
      >
        Добавить тип книги
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Тип</th>
            <th>Штраф</th>
            <th>Макс. дни</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {bookTypes.map((type) => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>{type.type}</td>
              <td>{type.fine}</td>
              <td>{type.day_count}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditType(type)}
                  className="mr-2"
                >
                  Редактировать
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteBookType(type.id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTypeId ? "Редактировать тип книги" : "Добавить тип книги"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBookType">
              <Form.Label>Тип книги</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите тип книги"
                name="type"
                value={newType.type}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFine">
              <Form.Label>Штраф (в день)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите размер штрафа"
                name="fine"
                value={newType.fine}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDayCount">
              <Form.Label>Макс. количество дней</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите количество дней"
                name="day_count"
                value={newType.day_count}
                onChange={handleChange}
                required
              />
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

export default BookTypes;
