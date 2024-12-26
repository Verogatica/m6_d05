const { getJoyas, getJoyasByFilters } = require('../models/joyas.model');

const consultaJoyas = async (req, res) => {
  try {
    const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
    const joyas = await getJoyas(Number(limits), Number(page), order_by);
    const totalJoyas = joyas.totalJoyas; 
    const stockTotal = joyas.stockTotal; 

    const hateoas = joyas.results.map((joya) => ({
      nombre: joya.nombre,
      href: `/joyas/${joya.id}`,
    }));

    res.json({
      totalJoyas,
      stockTotal,
      results: hateoas,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las joyas.' });
  }
};

const consultaJoyasFiltradas = async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;
    const joyas = await getJoyasByFilters(precio_min, precio_max, categoria, metal);
    
    res.json(joyas);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar las joyas.' });
  }
};

module.exports = {
  consultaJoyas,
  consultaJoyasFiltradas,
};
