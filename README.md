## Configuración del Entorno

### Archivo .env

Crea un archivo `.env` en la raíz de tu proyecto para definir variables de entorno. Aquí tienes un ejemplo de configuración:

### .env ejemplo
```bash
PERMISSIONS_OPTIONS_API_URL=https://run.mocky.io/v3/a4ff0f51-2b34-4369-ac5d-3deeb9797410
TRANSMISSORA_URL=http://localhost:3000
RECEPTORA_URL=http://localhost:3001 
DATA_URL=https://65e764a553d564627a8eb6d5.mockapi.io/process-demo
```

Asegúrate de que estas variables estén configuradas correctamente, ya sea para el desarrollo local o para el entorno de producción.

### Ejecutando el Proyecto - Modo de Desarrollo

Para ejecutar el servidor de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
o
yarn dev
```
Este comando iniciará el servidor de desarrollo de Next.js.


### Modo de Producción

Para ejecutar el servidor de producción, sigue estos pasos:

#### Compila el proyecto utilizando el siguiente comando:

```bash
npm run build
o
yarn build
```

Esto creará una versión compilada de tu proyecto.

### Inicia el servidor de producción utilizando el siguiente comando:

```bash
npm start
o
yarn start
```

Este comando iniciará un servidor Node.js para servir los archivos compilados en producción.
Implementación Recomendada

#### Para implementaciones, recomendamos el uso de Vercel. Para más información, visita Vercel.