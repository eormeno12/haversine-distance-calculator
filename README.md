[Deployment (Click Here)](https://haversine-distance-calculator.vercel.app
)

## Casos de prueba manual

| Test Case                                           | Precondition                                            | Test Steps                                                                                                                | Test Data                                       | Expected Result                                                |
|-----------------------------------------------------|---------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------|----------------------------------------------------------------|
| Verificar distancia entre dos ciudades válidas      | La aplicación debe estar funcionando con conexión a la API o acceso al archivo CSV. | 1. Seleccionar una ciudad y país para la "Ubicación 1" (ejemplo: "Lima, Perú").<br>2. Seleccionar otra ciudad y país para la "Ubicación 2" (ejemplo: "Bogotá, Colombia").<br>3. Presionar el botón "Calcular Distancia". | Ubicación 1: Lima, Perú<br>Ubicación 2: Bogotá, Colombia | La aplicación muestra un mensaje con la distancia calculada en kilómetros (ejemplo: "La distancia calculada es de 1887.13 km"). |
| Verificar mensaje de error cuando una ciudad no existe | La aplicación debe estar funcionando y tener conexión a la API o acceso al archivo CSV. | 1. Seleccionar una ciudad y país para la "Ubicación 1" (ejemplo: "Lima, Perú").<br>2. Seleccionar una ciudad y país para la "Ubicación 2" de la cuál no se tiene información (ejemplo: "Bokaa, Botswana").<br>3. Presionar el botón "Calcular Distancia". | Ubicación 1: Lima, Perú<br>Ubicación 2: Bokaa, Botswana | Aparece un mensaje de error indicando "Coordenadas de Bokaa, Botswana no encontradas". |
| Verificar resultado cuando ambas ciudades son la misma | La aplicación debe estar funcionando correctamente y tener conexión a la API o acceso al archivo CSV. | 1. Seleccionar la misma ciudad y país para la "Ubicación 1" y la "Ubicación 2" (ejemplo: "Lima, Perú").<br>2. Presionar el botón "Calcular Distancia". | Ubicación 1: Lima, Perú<br>Ubicación 2: Lima, Perú | La aplicación muestra un mensaje indicando "La distancia calculada es de 0.00 km". |


## Getting Started
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
