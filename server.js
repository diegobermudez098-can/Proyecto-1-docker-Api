const express = require('express');
const app = express();
app.use(express.json());

let productos = [
    { id: 1, nombre: 'Teclado Mecánico', precio: 45000 },
    { id: 2, nombre: 'Mouse Gamer', precio: 25000 }
];

app.get('/productos', (req, res) => {
    res.json(productos);
});

app.get('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('Producto no encontrado');
    res.json(producto);
});

app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('Producto no encontrado');
    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;
    res.json(producto);
});

app.delete('/productos/:id', (req, res) => {
    const index = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Producto no encontrado');
    const productoEliminado = productos.splice(index, 1);
    res.json(productoEliminado);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});