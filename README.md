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

## Verificación y publicación

`npm test` comprueba las acciones de Piti, contexto, calendario, almacenamiento y cifrado real, además de simular primeros accesos, otro dispositivo, recuperación automática, conflicto y cambio de contraseña. Las pruebas no utilizan credenciales reales ni escriben en GitHub. La prueba del sanitizador en un navegador real es opcional (`STUDIO_BROWSER_TEST=1`) y requiere un navegador ejecutable compatible.

El workflow `studio-checks.yml` ejecuta las pruebas al subir cambios. No publica claves, no necesita secretos de Actions y no cambia la configuración actual de GitHub Pages. No hay un archivo de bóveda inicial en el código: se crea cuando el propietario configura sus credenciales y confirma la conexión.
