import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function VistaPublica() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetchProducts().then(setProductos);
    }, []);

    return (
        <div className="container">
            <h2 className="mb-4">Nuestros Productos</h2>
            {productos.length === 0 ? (
                <p>No hay productos disponibles.</p>
            ) : (
                <Row xs={1} md={3} className="g-4">
                    {productos.map((producto) => (
                        <Col key={producto.id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={producto.imageUrl ? producto.imageUrl : '/images/placeholder.png'}
                                    alt={producto.name}
                                    style={{ objectFit: 'contain', height: '200px', backgroundColor: '#f8f9fa' }}
                                />
                                <Card.Body>
                                    <Card.Title>{producto.name || 'Sin nombre'}</Card.Title>
                                    <Card.Text>
                                        <strong>Precio:</strong>{' '}
                                        {producto.price ? `$${producto.price}` : 'No disponible'}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Stock:</strong>{' '}
                                        <span style={{ color: producto.stock > 0 ? 'green' : 'red' }}>
                                            {producto.stock > 0 ? 'Hay stock' : 'Sin stock'}
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
