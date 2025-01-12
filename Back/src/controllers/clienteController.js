const db = require("../config/db");

exports.createCliente = async (req, res) => {
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    telefono,
    calle,
    numero,
    ciudad,
    estado,
    pais,
    codigo_postal,
  } = req.body;

  if (!nombre || !apellido_paterno || !email) {
    return res
      .status(400)
      .json({ message: "Nombre, apellido paterno y email son obligatorios." });
  }

  try {
    const query = `
      INSERT INTO clientes 
      (nombre, apellido_paterno, apellido_materno, email, telefono, calle, numero, ciudad, estado, pais, codigo_postal) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      telefono,
      calle,
      numero,
      ciudad,
      estado,
      pais,
      codigo_postal,
    ];

    await db.execute(query, values);
    res.status(201).json({ message: "Cliente creado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el cliente." });
  }
};

exports.getClientes = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM clientes");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los clientes." });
  }
};

exports.getClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute("SELECT * FROM clientes WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el cliente." });
  }
};

exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido_paterno,
    apellido_materno,
    email,
    telefono,
    calle,
    numero,
    ciudad,
    estado,
    pais,
    codigo_postal,
  } = req.body;

  try {
    const query = `
      UPDATE clientes 
      SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, email = ?, telefono = ?, calle = ?, numero = ?, ciudad = ?, estado = ?, pais = ?, codigo_postal = ? 
      WHERE id = ?
    `;
    const values = [
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      telefono,
      calle,
      numero,
      ciudad,
      estado,
      pais,
      codigo_postal,
      id,
    ];

    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    res.status(200).json({ message: "Cliente actualizado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el cliente." });
  }
};

exports.deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM clientes WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    res.status(200).json({ message: "Cliente eliminado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el cliente." });
  }
};
