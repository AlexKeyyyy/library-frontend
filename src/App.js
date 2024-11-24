import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Clients from "./components/Clients";
import Books from "./components/Books";
import BookTypes from "./components/BookTypes";
import LibrarianJournal from "./components/LibrarianJournal";
import Reports from "./components/Reports";
import Login from "./components/Login"; // Импортируем компонент Login
import ProtectedRoute from "./components/ProtectedRoute"; // Импортируем ProtectedRoute
import Register from "./components/Register"; // Страница регистрации
import Logout from "./components/Logout";

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Библиотека</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/clients">
            Клиенты
          </Nav.Link>
          <Nav.Link as={Link} to="/books">
            Книги
          </Nav.Link>
          <Nav.Link as={Link} to="/book_types">
            Типы книг
          </Nav.Link>
          <Nav.Link as={Link} to="/journal">
            Журнал
          </Nav.Link>
          <Nav.Link as={Link} to="/reports">
            Отчеты
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            <Logout /> {/* Кнопка выхода */}
          </Nav.Link>
        </Nav>
      </Navbar>

      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Страница входа */}
          <Route path="/register" element={<Register />} />{" "}
          {/* Страница регистрации */}
          {/* Защищенные маршруты */}
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book_types"
            element={
              <ProtectedRoute>
                <BookTypes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <LibrarianJournal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<h1>Добро пожаловать в библиотеку!</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
