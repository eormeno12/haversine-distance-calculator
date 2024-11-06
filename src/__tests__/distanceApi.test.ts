import request from 'supertest';
import { createServer, Server } from 'http';
import { NextRequest } from 'next/server';
import { GET } from '../app/api/cities/distance/route'; 

describe('GET /api/distance', () => {
  let server: Server;

  beforeAll(() => {
    server = createServer(async (req, res) => {
      const url = new URL(req.url!, `http://${req.headers.host}`);
      const nextRequest = new NextRequest(url);
      const response = await GET(nextRequest);

      res.statusCode = response.status;
      response.headers.forEach((value, name) => {
        res.setHeader(name, value);
      });
      const responseBody = await response.text();
      res.end(responseBody);
    }).listen(0); // Escucha en un puerto disponible
  });

  afterAll((done) => {
    server.close(done);
  });

  it('debe devolver la distancia entre dos coordenadas válidas', async () => {
    const response = await request(server)
      .get('/api/distance')
      .query({
        lat1: '40.7128', // Nueva York
        lon1: '-74.0060',
        lat2: '34.0522', // Los Ángeles
        lon2: '-118.2437',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('distance');
    expect(typeof response.body.distance).toBe('number');
    expect(response.body.distance).toBeGreaterThan(0);
  });

  it('debe devolver una distancia de cero cuando las coordenadas son iguales', async () => {
    const response = await request(server)
      .get('/api/distance')
      .query({
        lat1: '40.7128', // Nueva York
        lon1: '-74.0060',
        lat2: '40.7128', // Mismas coordenadas
        lon2: '-74.0060',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('distance');
    expect(response.body.distance).toBe(0);
  });

  it('debe devolver un error 400 para coordenadas inválidas', async () => {
    const response = await request(server)
      .get('/api/distance')
      .query({
        lat1: 'invalid',
        lon1: '-74.0060',
        lat2: '34.0522',
        lon2: '-118.2437',
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid parameters');
  });
});
