export const jsonMiddleware = (req, res, next) => {
  console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
  next();
};

// Middleware para registrar detalles de cada solicitud
export const logRequestDetails = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toISOString();

  // Aquí es para agregar mas detalles como (cabeceras, cuerpo de la solicitud, etc.)
  console.log(`[${timestamp}] ${method} ${url}`);

  next(); // Llama al siguiente middleware o controlador
};
