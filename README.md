# cypressAndGithubActions

Repositorio de ejemplo que integra Cypress con GitHub Actions.

Este proyecto contiene pruebas de ejemplo y un workflow que permite ejecutar los tests
seleccionando el ambiente (staging o production) desde la UI de GitHub (`workflow_dispatch`).

## Cómo funciona (resumen)

- El workflow de Actions (`.github/workflows/cypress-GA.yml`) expone un input `environment` cuando
	ejecutas manualmente el workflow.
- El job valida y mapea ese input y lo exporta como la variable de entorno `CYPRESS_ENV`.
- `cypress.config.js` lee `process.env.CYPRESS_ENV` y carga `cypress/env/<env>.json`.
- Si el JSON del ambiente contiene `baseUrl`, `cypress.config.js` lo asigna a `config.baseUrl`.
- Tus tests deben usar rutas relativas en `cy.visit()` (por ejemplo `cy.visit('/')` o `cy.visit('/login')`) para que
	Cypress use el `baseUrl` del ambiente elegido.

## Archivos importantes

- `cypress.config.js` - carga variables según `CYPRESS_ENV` y configura `baseUrl`.
- `cypress/env/staging.json` - variables para staging (ej. `baseUrl`).
- `cypress/env/production.json` - variables para producción (ej. `baseUrl`).
- `.github/workflows/cypress-GA.yml` - workflow que expone el input `environment` y ejecuta Cypress.

## Ejecutar desde GitHub Actions (UI)

1. Ve a la pestaña **Actions** en GitHub.
2. Selecciona el workflow **Run Cypress Tests**.
3. Haz clic en **Run workflow**, elige `environment` (`staging` o `production`) y confirma.

El job validará la opción y ejecutará Cypress cargando las variables del ambiente seleccionado.

## Ejecutar localmente (PowerShell)

Puedes probar localmente con la misma variable de entorno que usa el workflow:

```powershell
$env:CYPRESS_ENV='staging'; npx cypress open
```

o para ejecutar en modo headless:

```powershell
$env:CYPRESS_ENV='production'; npx cypress run
```

Nota: `cypress.config.js` buscará `cypress/env/staging.json` o `cypress/env/production.json` y aplicará el `baseUrl`.

## Qué evitar
- No hardcodear URLs completas en los tests (`cy.visit('https://...')`). Usa rutas relativas: `cy.visit('/')` o `cy.visit('/ruta')`.
- No guardar secretos (API keys, contraseñas) en los JSON de ambientes del repositorio. Usa GitHub Secrets para eso y pásalos
	como variables de entorno al job.

## Ejemplos rápidos en tests

- Visitar la raíz del ambiente seleccionado:
```javascript
cy.visit('/'); // usará baseUrl desde cypress/env/<env>.json
```

- Usar variables definidas en `cypress/env/*.json`:
```javascript
const api = Cypress.env('apiUrl');
cy.request(`${api}/health`).its('status').should('eq', 200);
```

## Próximos pasos (opcional)
- Añadir scripts `npm run test:staging` / `npm run test:production` usando `cross-env` para simplificar comandos locales.
- Agregar instrucciones de CI/CD específicas si tu pipeline necesita autenticar contra el ambiente.

Si quieres que agregue los `npm` scripts o que actualice el workflow para subir reportes de forma distinta, dímelo y lo hago.
