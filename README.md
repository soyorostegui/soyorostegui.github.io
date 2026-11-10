# Peter Studio · GitHub Pages

Aplicación personal estática. Publica la raíz del repositorio en GitHub Pages; abre `/studio/` mediante HTTPS. No requiere Node en producción. Node 22+ se utiliza únicamente para las pruebas (`npm test`).

## Primera configuración

1. Abre Studio y crea una contraseña nueva de al menos 12 caracteres; es preferible una frase larga. No hay contraseña inicial pública.
2. Marca «Recordar este dispositivo» en un dispositivo propio. Esto guarda una CryptoKey no exportable en IndexedDB; no guarda la contraseña. Quien tenga acceso a ese perfil del navegador podrá usar la bóveda recordada.
3. Configura tus proveedores de IA en el gestor de claves. Las credenciales locales anteriores se migran al abrir la nueva bóveda; entonces se eliminan las copias antiguas en localStorage/sessionStorage.
4. Introduce un token de GitHub con acceso limitado a `soyorostegui/soyorostegui.github.io`, permiso `Contents: read and write`, y pulsa «Conectar Repo». Este permiso permite escribir en todo ese repositorio: no concedas permisos adicionales innecesarios.
5. Comprueba que el estado indique «Bóveda cifrada sincronizada con GitHub». Hasta ese momento, la bóveda puede existir únicamente en este navegador. «Descargar bóveda cifrada» permite conservar una copia adicional.

## Celular y otros computadores

Abre la misma dirección e introduce la contraseña de la bóveda. La aplicación descarga `studio/credential-vault.json` desde GitHub y descifra las claves de IA y el token en ese dispositivo. No necesitas pegarlos de nuevo. «Recordar este dispositivo» evita repetir la contraseña en ese perfil hasta que lo bloquees, borres sus datos o cambie la contraseña. Si IndexedDB está deshabilitado, podrás abrir la bóveda con contraseña, pero no recordar el dispositivo.

La opción de bloquear Studio elimina la clave de desbloqueo recordada en ese perfil y vacía las credenciales de la sesión actual. Otras pestañas ya abiertas pueden mantener su sesión en memoria; ciérralas también al usar un equipo compartido.

## Contraseña y conflictos

«Cambiar contraseña» verifica la actual, genera una sal nueva, vuelve a cifrar y actualiza GitHub antes de sustituir la copia local. Otros dispositivos pedirán la contraseña nueva al recuperar la versión actual. Una modificación remota distinta detiene el envío: no se sobrescriben cambios de otro dispositivo. Para resolverlo, usa «Traer bóveda»: si hay cambios pendientes pide confirmación y guarda una copia cifrada anterior. El enlace «Copia cifrada anterior» de la pantalla de acceso permite descargarla.

No existe recuperación de la contraseña. Si se pierde, las credenciales se deberán recuperar o regenerar desde las cuentas de sus proveedores y configurar una bóveda nueva. Cambiar la contraseña no revoca tokens ni elimina versiones anteriores del historial de GitHub: si una credencial se expuso, revócala en su proveedor.

## Qué protege esta versión

- Credenciales cifradas con AES-256-GCM, IV aleatorio de 96 bits por escritura y sal aleatoria de 128 bits; clave derivada con PBKDF2-HMAC-SHA256 y 600.000 iteraciones.
- El archivo remoto solo contiene parámetros de cifrado y texto cifrado autenticado. La contraseña nunca se envía a GitHub ni se guarda en el repositorio.
- Las credenciales descifradas se utilizan en memoria. La copia local del archivo también está cifrada. Las claves se envían a sus proveedores para las llamadas de IA y el token se envía a la API de GitHub para guardar.
- Una clave de dispositivo no exportable no impide que código malicioso ejecutado en el mismo origen la utilice. La protección del código publicado, el navegador y la cuenta de GitHub sigue siendo importante.
- La interfaz y el estado editorial (`studio-cloud-state.json` y `CONTEXTO_CONVERSACIONES_IA.md`) continúan siendo públicos. La bóveda protege las credenciales; no hace privados el calendario ni el historial ya publicado.
- Los proveedores de IA deben permitir llamadas desde el navegador (CORS). GitHub Pages no puede actuar como proxy de un proveedor que las bloquee.

Referencias: [Web Crypto AES-GCM](https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams), [PBKDF2 según OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [CryptoKey e IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).

## Sincronización automática entre dispositivos

Al abrir o volver a Studio se consulta GitHub. Los cambios locales se guardan automáticamente tras una pausa breve; también se revisan actualizaciones cada minuto mientras la página está visible. Sin conexión se conserva el trabajo y se reintenta al recuperar la red. No es necesario pulsar Conectar Repo después de la configuración inicial.

Studio conserva una versión común y combina cambios por campo: editar el texto en un dispositivo y el estado en otro conserva ambos cambios. Las publicaciones nuevas y los mensajes de chat se combinan; las eliminaciones incluyen marcas persistentes para que un dispositivo antiguo no las restaure. El calendario y su contexto Markdown se publican juntos en un único commit, conservando otros archivos del repositorio. Si la rama cambia durante el guardado, se vuelve a consultar y combinar.

Solo una edición incompatible del mismo campo, o editar una entrada que otro dispositivo eliminó, requiere elegir. El panel conserva un respaldo de ambas copias y aplica la elección únicamente a los conflictos; mantiene los demás cambios combinados. Sin una versión común recuperable, las diferencias ambiguas requieren esa misma revisión. La bóveda cifrada se sincroniza por separado y mantiene su protección frente a cambios simultáneos de credenciales.

Los formularios abiertos posponen la actualización para conservar lo que estás escribiendo. Las pruebas simulan cambios simultáneos, eliminaciones, recuperación de versiones antiguas, conflictos reales, desconexión, cambios durante el guardado y reintentos sin commits innecesarios.

## Verificación y publicación

`npm test` comprueba las acciones de Piti, contexto, calendario, almacenamiento y cifrado real, además de simular primeros accesos, otro dispositivo, recuperación automática, conflicto y cambio de contraseña. Las pruebas no utilizan credenciales reales ni escriben en GitHub. La prueba del sanitizador en un navegador real es opcional (`STUDIO_BROWSER_TEST=1`) y requiere un navegador ejecutable compatible.

El workflow `studio-checks.yml` ejecuta las pruebas al subir cambios. No publica claves, no necesita secretos de Actions y no cambia la configuración actual de GitHub Pages. No hay un archivo de bóveda inicial en el código: se crea cuando el propietario configura sus credenciales y confirma la conexión.

## Agenda y redes configurables

Nueva entrada permite crear publicaciones, reuniones, clases y tareas. Las publicaciones existentes mantienen sus IDs y se interpretan como publicaciones aunque no tengan el campo `type`. Todas las entradas permanecen en la colección histórica `posts`, con `type` (`post`, `meeting`, `class`, `task`), fecha, título y notas. Las reuniones y clases requieren inicio y fin en el mismo día; las tareas tienen prioridad y fecha límite. El proyecto y su etapa son opcionales. Los estados internos históricos se conservan para mantener la compatibilidad, con etiquetas generales para actividades.

Ajustes → Redes sociales permite añadir redes y eliminar las que no tienen referencias. El catálogo `networks` usa la misma sincronización de tres vías que las entradas, con marcas de eliminación. Los filtros se generan a partir del catálogo y las entradas existentes. El calendario, la tabla y el tablero muestran todos los tipos; arrastrar una entrada conserva sus campos específicos.

Piti puede consultar los datos de la agenda y modificar fechas de entradas por ID. Sus acciones de creación editorial siguen creando publicaciones; para crear reuniones, clases y tareas se utiliza Nueva entrada. No hay invitaciones, notificaciones ni integración externa de calendarios en esta versión.

## Proyectos

La vista Proyectos permite crear y editar fichas con objetivo, tipo (campaña, académico, cliente o personal), fechas, estado, color y etapas opcionales. Las entradas comparten una referencia estable `projectId`; el campo histórico `phase` conserva el nombre de la etapa. Una entrada puede quedar sin proyecto. La creación desde un proyecto o desde su filtro preselecciona el vínculo.

Las fases del lanzamiento original se interpretan como etapas de `project-portafolio-2026`, con una ficha inicial del portafolio. Esta migración se aplica de forma equivalente en el cliente y en la normalización de la sincronización, sin reemplazar los IDs ni los textos de las publicaciones. Un `projectId` vacío explícito desvincula una entrada e impide volver a asociarla por su antigua fase.

El detalle agrupa actividades por tipo y muestra próximas actividades, tareas vencidas y recuentos separados de tareas, publicaciones, reuniones y clases completadas. Los recuentos usan el estado manual, nunca completan una actividad por haber pasado su fecha. Los proyectos en uso se pueden archivar, pero no eliminar; tampoco se retiran etapas en uso. Los datos `projects` participan en la combinación de tres vías, y una eliminación concurrente con una nueva referencia genera un conflicto revisable.

Piti consulta las fichas y las referencias de la agenda; la administración de proyectos se realiza en su vista y formulario.
