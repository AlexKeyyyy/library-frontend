import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const BookTypes = () => {
    const [bookTypes, setBookTypes] = useState([]);

    useEffect(() => {
        fetchBookTypes();
    }, []);

    const fetchBookTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/book_types');
            setBookTypes(response.data);
        } catch (error) {
            console.error('Error fetching book types:', error);
        }
    };

    const deleteBookType = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/book_types/${id}`);
            fetchBookTypes(); // Обновляем список после удаления
        } catch (error) {
            console.error('Error deleting book type:', error);
        }
    };

    return (
        <div>
            <h2>Типы книг</h2>
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
        </div>
    );
};

export default BookTypes;
