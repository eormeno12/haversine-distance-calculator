import request from 'supertest';
import { createServer, Server } from 'http';
import { NextRequest } from 'next/server';
import { GET } from '../app/api/cities/coords/route'; 

describe('GET /api/coords', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe devolver un error 400 cuando faltan parámetros', async () => {
    const response = await request(server).get('/api/coords');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Missing parameters' });
  });

  it('debe devolver un error 400 para un método inválido', async () => {
    const response = await request(server)
      .get('/api/coords')
      .query({ q: 'Paris,France', method: 'invalid' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid method' });
  });

  it('debe devolver un error 400 para una consulta inválida', async () => {
    const response = await request(server)
      .get('/api/coords')
      .query({ q: 'InvalidQuery', method: 'api' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid query' });
  });

  it('debe devolver un error 500 cuando la ubicación no se encuentra usando api', async () => {
    const response = await request(server)
      .get('/api/coords')
      .query({ q: 'UnknownCity,UnknownCountry', method: 'api' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });

  it('debe devolver un error 404 cuando la ubicación no se encuentra usando csv', async () => {
    const response = await request(server)
      .get('/api/coords')
      .query({ q: 'UnknownCity,UnknownCountry', method: 'csv' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Location not found in CSV' });
  });
});
