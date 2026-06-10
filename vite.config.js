import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import loadHandler from './api/load.js'
import saveHandler from './api/save.js'

// Simple helper to parse body and add status/json helpers to response
function apiMiddleware(handler) {
  return async (req, res) => {
    // Helper to send JSON response
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return res;
    };

    // Helper to read and parse body if POST
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      await new Promise((resolve) => {
        req.on('end', () => {
          try {
            req.body = JSON.parse(body);
          } catch {
            req.body = {};
          }
          resolve();
        });
      });
    }

    try {
      await handler(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // Expose these to the serverless function process.env
  process.env.MONGODB_URI = env.MONGODB_URI;
  process.env.MONGODB_DB = env.MONGODB_DB;
  process.env.MONGODB_COL = env.MONGODB_COL;

  console.log(`[API Server] Loaded MONGODB_URI: ${env.MONGODB_URI ? env.MONGODB_URI.substring(0, 30) + '...' : 'NOT FOUND'}`);

  return {
    plugins: [
      react(),
      {
        name: 'api-serverless-routes',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url.split('?')[0];
            if (url === '/api/load') {
              await apiMiddleware(loadHandler)(req, res);
            } else if (url === '/api/save') {
              await apiMiddleware(saveHandler)(req, res);
            } else {
              next();
            }
          });
        }
      }
    ],
  }
})

