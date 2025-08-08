# Chat-alba-api

API backend para Alba, la asistente virtual simpática y manchega de la Feria de Albacete.

## Descripción

Este proyecto es una API construida con Node.js, Express y MongoDB, que permite gestionar eventos, agendas y conversaciones con una asistente virtual llamada Alba. Integra OpenAI para respuestas inteligentes y personalizadas, y permite a los usuarios consultar y crear eventos de la feria, así como gestionar su propia agenda.

## Características

- Gestión de eventos de la Feria de Albacete (crear, consultar).
- Gestión de agenda personal de usuarios.
- Integración con OpenAI para respuestas conversacionales y ejecución de funciones (tools).
- API RESTful con endpoints para eventos, agenda y chat.
- Persistencia de datos en MongoDB Atlas.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/anibalPicazo/chat-alba-api
   cd chat-alba-api
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` con tus variables de entorno:
   ```
   MONGO_URI='tu_cadena_de_conexion_mongodb'
   OPENAI_API_KEY='tu_clave_openai'
   PORT=3000
   ```

4. Inicia el servidor:
   ```bash
   npm start
   ```

## Endpoints principales

- `POST /chat`  
  Envía un mensaje a Alba y recibe una respuesta inteligente.

## Estructura del proyecto

```
├── controllers/
├── database/
├── models/
├── routes/
├── services/
├── .env
├── index.js
```

## Stack:


![MongoDB](https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat) ![OpenAI](https://shields.io/badge/-OpenAI-93f6ef?logo=openai)