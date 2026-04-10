# Decisiones

## 1. Estructura de routing

¿Cómo estructuraste el routing del tipo de evento al handler? ¿Qué cambiaría con 20 tipos de eventos?

> Escribi un objeto mapa donde cada clave es el `detail-type` del evento y el valor es la función que lo maneja
Aca un ejemplo de como quedaria:

```typescript
    const handlers = {
        MachineMoved: (...) => handleMachineMoved(...),
        OOSReportBatchCreated: (...) => handleOOSReportBatchCreated(...),
        DocumentsExpiring: (...) => handleDocumentsExpiring(...),
    }
```

Cuando llega un evento, el engine busca el handler correspondiente por su tipo y lo ejecuta. atraves de un lookup en el objeto.

Si por ejemplo se quiere escalar a  20 tipos de eventos esto escalaría bien. Cada nuevo evento requiere dos cosas: un archivo nuevo con su handler y una línea nueva en el objeto. El resto del código no se toca. La unica consideracion con mas eventos seria organizar los handlers en subcarpetas por dominio para mantener el proyecto mas organizado.

## 2. Extensibilidad multi-canal

¿Cómo extenderías esto para soportar notificaciones por email y push por usuario?

> El engine devuelve una lista de notificaciones con `recipient_id` y `payload`. Para agregar canales de envío real, agregaría una capa después del engine que tome esa lista y haga un dispatch:

```typescript
const notifications = processEvent(event, users, projects, machines);

for (const notification of notifications) {
  await emailService.send(notification);
  await pushService.send(notification);
}
```

Cada usuario puede tener preferencias de canal guardadas en el repositorio. El dispatcher consultaría esas preferencias y elegiria si mandar email, push o ambos. El engine en sí no cambiaría, seguiría produciendo la misma lista. Solo se agregaría la capa para hacer el dispatch.

## 3. Planificación y uso de IA

Antes de escribir código, ¿cómo planificaste la solución? (ej: pseudocódigo, un esquema rápido, una lista de pasos)

Si usaste herramientas de IA: ¿qué le pediste, qué aceptaste tal cual y qué cambiaste o rechazaste? Un ejemplo concreto vale más que una descripción general.

Si no usaste IA: ¿por qué no?

> Lo primero que hice fue hacer una lectura del proyecto para asegurarme el flujo y como organizarme:

1. Los tipos en `repositories/types.ts` — para entender las entidades del negocio (User, Project, Machine)
2. Los repositorios — para saber qué consultas tenía disponibles
3. Los schemas de eventos — para entender qué datos traía cada evento
4. Los tests — para entender exactamente qué se esperaba como output

Los tests fueron la guía principal. Me indicaron el contrato de salida: un array de objetos con `recipient_id` y opcionalmente `payload`.

Con eso claro, hice un map cada evento con su regla de negocio:

- `MachineMoved` → necesito el `to_project_id` → buscar `site_supervisor` en ese proyecto
- `OOSReportBatchCreated` → necesito deduplicar por `project_id` → buscar `project_manager` por proyecto
- `DocumentsExpiring` → necesito ir de `machine_id` → `company_id` → buscar `company_admin`

Despues de tener ese mapa claro empecé a codear, handler por handler para tenerlo todo manera modularizada y organizada.


## 4. Extensión sin romper lo existente

Si mañana aparece un nuevo evento con una regla de negocio distinta, ¿qué partes de tu implementación tendrías que tocar y cuáles no?

> **Tocarías:**
- Crear un nuevo archivo en `src/notifications/handlers/` con la lógica del nuevo evento
- Agregar una línea en el objeto `handlers` dentro de `engine.ts`
- Agregar el nuevo schema Zod en `src/events/` y registrarlo en el `discriminatedUnion`

**No tocarías:**
- `handler.ts` — el entry point no cambia
- Los handlers existentes — cada uno es independiente
- `types.ts` — el contrato de salida sigue siendo el mismo
- Los repositorios — si el nuevo evento usa los mismos datos, no hay que tocar nada

Cada handler tiene propio archivo y no sabe nada de los otros.
