# Trufa & Truffle

Web corporativa estática para **Trufa & Truffle**, productora y distribuidora de trufa negra fresca `Tuber melanosporum` de Teruel, España. Está orientada a cocinas profesionales, distribuidores, importadores y profesionales de la hostelería.

## Contenido

- Presentación de la empresa y sus campos.
- Información sobre producto, cosecha, categorías y formatos.
- Selección individual, lavado manual y proceso de preparación.
- Requisitos a medida, logística y públicos profesionales.
- Formulario de contacto, teléfono, correo y acceso a WhatsApp.
- Interfaz disponible en español, inglés y francés.

## Uso local

No requiere instalación de paquetes ni compilación. Abre [index.html](index.html) directamente en un navegador o publícalo desde cualquier servidor de archivos estáticos.

El formulario prepara un correo en el cliente local del visitante dirigido a `administration@trufaandtruffle.com`.

## Estructura

| Ruta | Finalidad |
| --- | --- |
| [index.html](index.html) | Estructura, secciones, enlaces y contenido de reserva. |
| [css/styles.css](css/styles.css) | Diseño visual, distribución adaptable y animaciones. |
| [js/i18n.js](js/i18n.js) | Textos en español, inglés y francés. |
| [js/main.js](js/main.js) | Idiomas, navegación móvil, carruseles, enlaces activos y formulario. |
| [images/](images/) | Recursos fotográficos de la web. |

## Idiomas

El selector superior permite cambiar entre `ES`, `GB` y `FR`. La selección se conserva en el navegador mediante `localStorage`, usando la clave `tt-lang`.

Para modificar un texto traducible, actualiza la clave correspondiente en [js/i18n.js](js/i18n.js) para los tres idiomas. El contenido de reserva de [index.html](index.html) debe conservarse actualizado para que la web siga siendo comprensible antes de cargar JavaScript.

## Contacto

- Teléfono y WhatsApp: `+34 608 55 13 72`
- Correo: `administration@trufaandtruffle.com`

## Publicación y versiones

La versión inicial publicada es `v1.0.0`. El repositorio remoto se encuentra en `origin` y la rama de publicación es `main`.

Para publicar cambios revisados:

```bash
git add index.html css/styles.css js/i18n.js js/main.js
git commit -m "Describe el cambio"
git push origin main
```

Para crear una nueva versión:

```bash
git tag -a vX.Y.Z -m "Version X.Y.Z"
git push origin vX.Y.Z
```