import request from 'supertest';
import { createServer } from 'http';
import { NextRequest } from 'next/server';
import { GET } from '../app/api/cities/coords/route'; // Ajusta la ruta según tu estructura de carpetas
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Mock de las dependencias externas
jest.mock('node-fetch');
jest.mock('fs');

const { Response } = jest.requireActual('node-fetch');

describe('GET /api/coords', () => {
  let server: any;

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

  it('debe devolver las coordenadas usando el método api', async () => {
    // Mock de la respuesta del fetch
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response(
        JSON.stringify([{ lat: '48.8566', lon: '2.3522' }]), // Coordenadas de París
        { status: 200 }
      )
    );

    const response = await request(server)
      .get('/api/coords')
      .query({ q: 'Paris,France', method: 'api' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ lat: 48.8566, lon: 2.3522 });
  });

  it('debe devolver las coordenadas usando el método csv', async () => {
    // Mock de la lectura del archivo CSV
    const csvData = `city_ascii,country,lat,lng
Paris,France,48.8566,2.3522
`;

    (fs.createReadStream as jest.Mock).mockReturnValueOnce({
      pipe: jest.fn().mockReturnThis(),
      on: function (event: string, callback: Function) {
        if (event === 'data') {
          callback({
            city_ascii: 'Paris',
            country: 'France',
            lat: '48.8566',
            lng: '2.3522',
          });
        }
        if (event === 'end') {
          callback();
        }
        return this;
      },
      destroy: jest.fn(),
    });

    const response = await request(server)
      .get('/api/coords')
      .query({ q: 'Paris,France', method: 'csv' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ lat: 48.8566, lon: 2.3522 });
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

  it('debe devolver un error 404 cuando la ubicación no se encuentra usando api', async () => {
    // Mock de la respuesta del fetch para ubicación no encontrada
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      new Response('[]', { status: 200 })
    );

    const response = await request(server)
      .get('/api/coords')
      .query({ q: 'UnknownCity,UnknownCountry', method: 'api' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Location not found in API' });
  });

  it('debe devolver un error 404 cuando la ubicación no se encuentra usando csv', async () => {
    // Mock de la lectura del archivo CSV sin resultados
    (fs.createReadStream as jest.Mock).mockReturnValueOnce({
      pipe: jest.fn().mockReturnThis(),
      on: function (event: string, callback: Function) {
        if (event === 'end') {
          callback();
        }
        return this;
      },
      destroy: jest.fn(),
    });

    const response = await request(server)
      .get('/api/coords')
      .query({ q: 'UnknownCity,UnknownCountry', method: 'csv' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Location not found in CSV' });
  });
});
