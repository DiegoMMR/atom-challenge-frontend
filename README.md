# AtomChallengeFrontend

live site: https://atom-day.mr-diego.dev/
live site on chat: https://atom-day.mr-diego.dev/#/chat
link telegram https://t.me/toyota_ia_bot

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

## Arquitectura del proyecto

Este proyecto sigue una arquitectura **feature-based** con Angular 21, usando **Signals** como mecanismo principal de estado reactivo (sin Zone.js gracias a `provideZonelessChangeDetection()`).

### Estructura de carpetas

```
src/app/
├── core/                          # Servicios globales y capa de acceso a datos
│   ├── api.ts                     # Cliente HTTP centralizado (getFlows, saveFlow, sendMessage)
│   ├── nodes-service.ts           # Estado global del canvas: nodos, aristas y nodo seleccionado
│   └── rules-node-service.ts      # Reglas de conexión entre tipos de nodo
│
├── features/                      # Módulos funcionales independientes
│   ├── flow-editor/               # Editor visual de flujos de IA
│   │   └── components/
│   │       ├── flow-canvas/       # Canvas principal (ngx-vflow); gestiona conexiones y carga de flujos
│   │       ├── catalogs-node/     # Panel lateral con el catálogo de nodos disponibles
│   │       ├── node-base/         # Componente visual reutilizable para cada nodo del canvas
│   │       └── node-config/       # Panel de configuración del nodo seleccionado
│   │
│   └── live-chat/                 # Chat en tiempo real con el agente de IA
│       ├── live-chat.ts           # Componente principal con estado de mensajes (Signals)
│       ├── chat-api.service.ts    # Servicio de comunicación con la API de chat
│       └── chat.models.ts         # Modelos de mensaje, roles y estado de UI
│
├── models/                        # Interfaces y tipos compartidos
│   ├── nodes.model.ts             # NodeType, NodeTheme, NodeHandles, NODE_META, etc.
│   ├── node-config.model.ts       # INodeConfig, NodePorts, FlowConfig
│   ├── live-chat.model.ts         # LiveChatResponse, SendMessageData
│   └── send-flow.model.ts         # SendFlow (payload para guardar un flujo)
│
├── nodes/                         # Implementaciones específicas de tipos de nodo
│   └── node-one/
│
├── app.routes.ts                  # Rutas: / → FlowCanvas, /chat → LiveChat
└── app.config.ts                  # Configuración global: router (hash), HttpClient, zoneless
```

### Flujo de datos principal

```
API (backend)
   │
   ▼
Api (core/api.ts)          ← HttpClient, URLs desde environment
   │
   ├──▶ NodesService        ← signals: nodes[], edges[], selectedNodeId
   │        │
   │        ▼
   │    FlowCanvas          ← computed() desde NodesService; usa ngx-vflow
   │        ├── CatalogsNode  (panel de catálogo)
   │        └── NodeConfig    (panel de configuración)
   │
   └──▶ ChatApiService      ← wrappea Api.sendMessage()
            │
            ▼
         LiveChat            ← signals: messages[], uiState, inputText
```

### Decisiones de diseño destacadas

| Decisión                          | Detalle                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------- |
| **Signals en lugar de RxJS/NgRx** | Estado de UI totalmente reactivo sin boilerplate de store                     |
| **Zoneless**                      | `provideZonelessChangeDetection()` para mayor rendimiento                     |
| **Hash routing**                  | `withHashLocation()` para compatibilidad con hosting estático                 |
| **ngx-vflow**                     | Librería para el canvas de flujos con nodos y aristas personalizables         |
| **Reglas de conexión**            | `RulesNodeService` centraliza qué tipos de nodo pueden conectarse             |
| **Tipos de nodo**                 | `init`, `end`, `orchestrator`, `validator`, `specialist`, `memory`, `generic` |
