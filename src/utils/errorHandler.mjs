export const handleError = (err, res) => {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  };