
// This file configures a proxy for development mode only
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // This proxy is only used in development mode 
  // to forward requests from the frontend to the backend server
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // keep API path
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Something went wrong connecting to the backend server. Make sure the backend server is running on http://localhost:5000');
      }
    })
  );
};
