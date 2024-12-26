const pool = require('../config/db');

const getJoyas = async (limit, page, orderBy) => {
  const offset = (page - 1) * limit;

  const totalQuery = `
    SELECT COUNT(*) AS total_joyas, SUM(stock) AS stock_total
    FROM inventario;
  `;
  const totalResult = await pool.query(totalQuery);
  const { total_joyas, stock_total } = totalResult.rows[0];

  const query = `
    SELECT id, nombre
    FROM inventario
    ORDER BY ${orderBy.replace('_', ' ')}
    LIMIT $1 OFFSET $2;
  `;
  const { rows } = await pool.query(query, [limit, offset]);

  const joyas = rows.map(joya => ({
    id: joya.id,
    nombre: joya.nombre,
  }));

  return {
    totalJoyas: total_joyas,
    stockTotal: stock_total,
    results: joyas,
  };
};

const getJoyasByFilters = async (precioMin, precioMax, categoria, metal) => {
  const query = `
    SELECT * FROM inventario
    WHERE precio >= $1 AND precio <= $2
    AND ($3::text IS NULL OR categoria = $3)
    AND ($4::text IS NULL OR metal = $4);
  `;
  const values = [precioMin || 0, precioMax || 9999999, categoria, metal];
  const { rows } = await pool.query(query, values);
  return rows;
};

module.exports = {
  getJoyas,
  getJoyasByFilters,
};
