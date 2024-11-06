import type { Config } from 'jest';

const config: Config = {
  // Indica que estás utilizando TypeScript con Jest
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Limpia los mocks entre cada prueba
  clearMocks: true,

  // Mapea los alias de módulo para que Jest pueda resolverlos
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Opcional: Si usas transformaciones adicionales, puedes especificarlas aquí
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'ts-jest',
  // },

  // Otras configuraciones pueden mantenerse comentadas o ajustarse según tus necesidades
};

export default config;
