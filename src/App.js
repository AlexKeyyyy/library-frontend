import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Clients from './components/Clients';
import Books from './components/Books';
import BookTypes from './components/BookTypes';
import LibrarianJournal from './components/LibrarianJournal';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Библиотека</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/clients">Клиенты</Nav.Link>
          <Nav.Link as={Link} to="/books">Книги</Nav.Link>
          <Nav.Link as={Link} to="/book_types">Типы книг</Nav.Link>
          <Nav.Link as={Link} to="/journal">Журнал</Nav.Link>
        </Nav>
      </Navbar>

      <div className="container mt-4">
        <Routes>
          <Route path="/clients" element={<Clients />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book_types" element={<BookTypes />} />
          <Route path="/journal" element={<LibrarianJournal />} />
          <Route path="/" element={<h1>Добро пожаловать в библиотеку!</h1> }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
