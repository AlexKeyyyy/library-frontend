import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const TopBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchTopBooks();
  }, []);

  const fetchTopBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/reports/top-books"
      );
      setBooks(response.data || []);
    } catch (error) {
      console.error("Error fetching top books:", error);
    }
  };

  return (
    <div>
      <h2>Три самые популярные книги</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Название книги</th>
            <th>Количество выдач</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>{book.borrow_count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TopBooks;
