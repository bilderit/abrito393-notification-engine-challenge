# Motor de Notificaciones — Desafío técnico

**Plazo:** 7 días desde que lo recibís.

## Contexto

Estamos construyendo un motor de notificaciones que recibe eventos de dominio y decide
a quién notificar y por qué. No hay envío real — dado un evento entrante, el sistema
debe producir una lista de notificaciones que describa qué se debería enviar y a quién.

## Qué está provisto

- TypeScript + Jest + Zod — nada más
- Schemas Zod para 3 eventos de dominio en `src/events/`
- Un entry point `handler.ts` — parsea el payload del evento y tiene un comentario
  `// TODO: wire your solution here`. Cómo llenás ese hueco es tu decisión.
- Repositorios fake en memoria en `src/repositories/` — pre-cargados con datos realistas
  e interfaces tipadas
- 3 stubs de test fallando en `src/__tests__/engine.spec.ts` que aseguran comportamiento
  observable (no nombres de clases ni firmas de métodos específicas)

## Setup

```bash
npm install
npm test        # corre los 3 stubs fallando
npm run build   # solo type-check
```

## Reglas a implementar

- **`MachineMoved`**: notificar al supervisor de sitio del proyecto destino
- **`OOSReportBatchCreated`**: notificar al project manager de cada proyecto afectado
  — una notificación por proyecto
- **`DocumentsExpiring`**: notificar al/los admin de la empresa — una notificación por
  empresa, con todos los documentos que vencen en el payload

## Preguntas escritas

Responde estas preguntas en `DECISIONS.md` antes de entregar:

1. ¿Cómo estructuraste el routing del tipo de evento al handler? ¿Qué cambiaría con 20 tipos de eventos?
2. ¿Cómo extenderías esto para soportar notificaciones por email y push por usuario?
3. ¿Cómo planificaste la solución antes de escribir código? ¿Cómo integraste la IA en ese proceso?
4. Si mañana aparece un nuevo evento con una regla distinta, ¿qué partes de tu implementación tendrías que tocar y cuáles no?

## Sobre el uso de IA

Podés usar herramientas de IA (Copilot, Cursor, ChatGPT, etc.). Nosotros también las usamos.
Lo que nos importa es que **entiendas qué estás construyendo y por qué** — no si escribiste cada línea vos mismo.
En `DECISIONS.md`, contanos cómo planificaste la solución antes de escribir código y, si usaste IA, cómo la integraste en ese proceso.

## Historial de commits

Commiteá a medida que avanzás. Vamos a mirar el historial para entender cómo encaraste el problema — no solo el resultado final.
Commits chicos y bien descritos son mejor que un solo commit al final.

## Qué evaluamos

- Cómo modelás el problema antes de escribir código
- Correctitud de la lógica de negocio
- Calidad de los tests
- Cómo comunicás tus decisiones
- Extensibilidad sin over-engineering

## Qué NO evaluamos

- Conocimiento de frameworks
- Setup de base de datos u ORM
- CI/CD o deployment
