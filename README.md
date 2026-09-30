# v21 · Tipografía combinada, typewriter y cursor Collector

Edición directa de la carpeta v21 existente, solicitada el 30 de septiembre de 2026. No se creó v22. Inicio: `index.html`. Compañía: `company.html`. Base heredada: v20; el navbar del producto ya usaba el logo Collector.

## Preparación para GitHub

- Subir el contenido de esta carpeta, conservando `index.html`, `company.html` y `assets/` juntos y con sus nombres originales.
- Sitio estático: no necesita instalación de paquetes, compilación ni claves de acceso para visualizarse.
- `.gitignore` excluye archivos temporales, dependencias locales y patrones comunes de credenciales; revisar siempre los archivos antes del primer commit.
- `.gitattributes` normaliza texto y conserva imágenes y fuentes como binarios; `.nojekyll` permite servir los archivos estáticos sin procesamiento Jekyll.
- Se incluyen las licencias OFL de las fuentes. Los derechos sobre marcas y materiales corporativos corresponden a sus titulares; esta preparación técnica no concede licencias adicionales.
- El formulario aún no envía consultas. Subir el sitio no habilita ese servicio.
- No se configura un remoto ni se publica automáticamente. El acceso a GitHub requiere autenticar la cuenta y tener permisos sobre el repositorio elegido.

## Diseño y funcionamiento de v21

- Logo del navbar Collector ampliado de 84 a 150 px de ancho (126 px en móvil); compañía a 102 px. Menú móvil del producto con su logo Collector y textos alternativos corregidos.
- Hero combina Manrope 500 con Monda 500 para «utilizables» / «usable», en cian #00B1FF (el color del marco anterior). Se elimina el marco solo en esa palabra del hero. El texto blanco se aligera de 600 a 500 para equilibrar ambos estilos.
- Typewriter inspirado en el script local `1 pagina web/web v3`: avance letra por letra, pausa de 30 segundos antes de repetir. Se adapta al idioma, reserva el espacio para evitar saltos y expone el texto completo a tecnologías de asistencia.
- Los títulos de sección de ambas páginas combinan Manrope con Monda, ambos en peso 500, y conservan los recuadros punteados y los colores previos. Monda reemplaza a Space Mono por solicitud del usuario.
- «Usa como nunca» y su traducción inglesa conservan el texto completo en una sola línea: escala tipográfica vinculada al ancho de la columna, con límites legibles. Verificado en 11 anchos, desde 320 hasta 1920 px, en ambos idiomas.
- Favicon oficial de Collector como acompañante del cursor: 16 px, aro seguidor de 38 px con interpolación, convergencia al detenerse y rotación por scroll. La flecha nativa no se oculta. Sin bloqueo de clics.
- Efectos desactivados con movimiento reducido o puntero táctil. Escritura detenida al salir del hero, ocultar la pestaña o pausar la animación. Cursor oculto al abandonar la ventana, navegar con Tab o escribir en campos.
- Monda variable incluida localmente con su licencia OFL desde google/fonts; favicon copiado de `logos nuevos 03-26/AKI Collector SVG/favicon.svg`.
- Compañía también escribe «datos» / «data» en su hero. Icono y aro del cursor en verde: variante SVG local con la misma geometría, gradiente #006B70–#3AB88C y aro #006B70. El cursor de Collector conserva su cian.
- Verificados 28 casos de página/idioma/ancho (320 a 1920 px), escritura ES/EN, convergencia del aro, giro, fallback táctil, menús, pestañas, formulario y rutas. Sin errores JavaScript detectados. Revisión visual de hero, plataforma, industrias, partners, compañía y móvil.

v20 y versiones anteriores permanecen intactas. La raíz se sincroniza con v21.

## Base heredada de v20

- Collector conserva el estilo DESIGN 4 de v19.
- Navbar y menú móvil del producto: archivo original `logotipo Aki data letras blancas.png`, copiado como `assets/akidata-wordmark-white.png`, sin fondo añadido.
- Hero en dos columnas: animación existente a la izquierda y mensaje a la derecha. Se retiró el esquema SVG y el panel dejó de sobresalir hacia la sección siguiente. En móvil se apilan mensaje y animación dentro del hero.
- Título del hero reducido: máximo 62 px en escritorio, 38 px en tablet y 36–44 px en móvil. Esta escala de v18 es la referencia para futuras versiones.
- Industrias recupera los seis archivos WebP originales y las tarjetas de colores de v18, con recursos locales.
- Partners compactos en ambas páginas: sin altura mínima de 360 px y con espacios y logotipos ajustados.
- Footer del producto violeta #101047 (más oscuro que las secciones), con logo de letras blancas de 104 px. Compañía conserva el footer marino.
- Compañía parte del HTML y estilos de v18 (verde / azul océano), con logotipo de letras verdes original en navbar y menú móvil.

## Validación

- Ambas páginas, español/inglés, anchos de 320, 390, 768, 1440 y 1920 px.
- Sin desbordamientos, imágenes faltantes, rutas/anclas rotas ni errores JavaScript detectados.
- Menús móviles, pestañas de plataforma y planes, FAQ, modal, Escape, hover y movimiento reducido.
- Comprobada la posición izquierda de la animación en escritorio, el fondo transparente del logo, las seis imágenes de industrias y las tarjetas compactas de partners.
- Revisión visual de escritorio y móvil, industrias, partners, compañía y footer.
- Capacidades y contenido de los cuatro planes conservados sin cambios.

Todos los recursos necesarios están en `assets/`. Los archivos CSS y JS con nombres de versiones anteriores son bases locales utilizadas por esta versión, no dependencias de otras carpetas. La licencia de Manrope está incluida.

Se conserva la experiencia mixta de secciones claras y oscuras, sin selector de tema. El formulario sigue siendo una demostración: no envía ni guarda consultas.

v18 y v19 permanecen intactas.

## Ajustes en la misma v20 · 25 septiembre 2026

Por solicitud explícita se editó esta versión sin crear v21.

- Contenedores y navbar al 85% del viewport en escritorio; márgenes adaptados para tablet y móvil.
- Enlace directo Compañía en el navbar de Collector, sin desplegable.
- Transición de salida de 180 ms y entrada de 280 ms entre las páginas. Conserva idioma y fragmentos; no intercepta abrir en nueva pestaña ni anclas de la página. Sin animación al preferir movimiento reducido y con restauración al usar Atrás.
- Títulos claros del producto en tinta + azul #20599E; títulos oscuros con segunda frase enmarcada por trazo punteado. Segundas frases separadas en una nueva línea.
- Compañía con botones verdes, énfasis verdes (menta sobre oscuro), hover verde del footer y logo circular del hero ampliado.
- Los dos productos pendientes muestran el nombre provisional AKI lorem-ipsum.
- Retirado el aviso introductorio de los formularios, con logo ampliado. Se conserva el mensaje de no envío al enviar: no se integró un backend.
- Validados 20 casos de idioma/página/viewport, transición ida/vuelta/Atrás, rutas, imágenes, formulario y revisión visual de escritorio y móvil.
# akidata-collectorv21
