# Challenge de IA para Contadores - Resumen Ejecutivo

## 🎯 Objetivo Principal
Desarrolle un chatbot inteligente conectado a Twitter de ARCA (Administración Federal de Ingresos Públicos Argentina) para generar reportes contables automatizados y distribuirlos vía Slack.

## 📋 Challenge

### Contexto
Los contadores necesitan mantenerse actualizados con las normativas fiscales y cambios regulatorios de ARCA. Este challenge desarrollará un asistente de IA que:
- Monitorea automáticamente las comunicaciones de ARCA en Twitter
- Procesa y analiza información fiscal/contable con IA
- Genera resúmenes ejecutivos personalizados
- Distribuye alertas inteligentes a equipos contables

### Problema a Resolver
**Pain Point:** Los contadores pierden tiempo monitoreando manualmente updates de ARCA y necesitan procesar grandes volúmenes de información regulatoria para mantenerse compliance.

## 🤖 Componentes de IA a Implementar (Simplificado)

### 1. **Twitter Scraper con Playwright**
- **Tecnología:** Playwright (headless browser automation)
- **Función:** Scrapear tweets de @ARCA_Informa sin necesidad de API
- **Implementación:** 
  - Navegador headless que visita x.com/arca_informa
  - Extrae últimos tweets con selectores CSS/XPath
  - Detecta tweets nuevos comparando con última ejecución
  - Ejecuta cada 10-15 minutos con scheduler

### 2. **Procesador IA Directo**
- **Tecnología:** OpenAI API (GPT-4) con API Key proporcionada
- **Función:** Procesar tweets scrapeados y generar resúmenes
- **Prompt Engineering:**
  - Clasificar relevancia del tweet para contadores
  - Extraer información clave (fechas, normativas, códigos)
  - Generar resumen ejecutivo en español
  - Determinar nivel de urgencia

### 3. **Distribuidor de Slack**
- **Tecnología:** Slack Webhook/Bot API
- **Función:** Enviar resúmenes formateados al canal
- **Características:**
  - Formateo markdown para Slack
  - Alerts por urgencia
  - Threading de conversaciones relacionadas

## 🏗️ Arquitectura Técnica Simplificada

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Playwright    │───▶│  OpenAI API     │───▶│   Slack API     │
│   (Scraper)     │    │  (Processing)   │    │   (Output)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Tweets Cache    │    │ Prompt Engine   │    │ Message Queue   │
│ (JSON/SQLite)   │    │ + API Calls     │    │ (Notifications) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Flujo Simplificado:**
1. **Playwright Scraper** → Visita [x.com/arca_informa](https://x.com/arca_informa) sin login
2. **Tweet Detector** → Compara con cache para detectar nuevos tweets
3. **OpenAI Processor** → Envía tweet + prompt a ChatGPT API
4. **Slack Sender** → Formatea respuesta y envía al canal

## 💻 Stack Tecnológico Simplificado

### Backend
- **Framework:** Node.js + Express
- **Web Scraping:** Playwright (headless browser automation)
- **IA:** OpenAI API directa (con API Key proporcionada)
- **Database:** SQLite/JSON para cache de tweets ya procesados
- **Scheduler:** node-cron para ejecutar scraping cada 15 minutos

### Dependencias Principales
- **playwright** - Web scraping sin detectar
- **openai** - API de ChatGPT
- **@slack/webhook** - Envío a Slack
- **node-cron** - Programación de tareas
- **sqlite3** - Persistencia ligera

### APIs Necesarias
- **OpenAI API** (procesamiento con ChatGPT)
- **Slack API/Webhooks** (envío de mensajes)

### Infrastructure
- **Docker + Docker Compose**
- **Playwright browsers** incluidos en container
- **Environment variables** para API keys

## 📊 Criterios de Evaluación del Challenge

### 1. **Implementación de IA (40%)**
- Calidad de procesamiento de texto con LLMs
- Efectividad del sistema RAG
- Precisión en clasificación y extracción de entidades
- Creatividad en uso de prompts y fine-tuning

### 2. **Integración de APIs (25%)**
- Robustez en conexión con Twitter API
- Implementación elegante de Slack notifications
- Manejo de rate limits y errores

### 3. **Arquitectura y Escalabilidad (20%)**
- Diseño de sistema distribuido
- Manejo de concurrencia y procesamiento asíncrono
- Optimización de costos de APIs de IA

### 4. **UX/DX y Automatización (15%)**
- Calidad de resúmenes generados
- Configuración y personalización
- Documentación y deployment

## 🎯 Entregables Específicos (Con Playwright)

### Core Features (MVP)
1. **Playwright Scraper:** Script que visita twitter.com/ARCA_Oficial cada 15 minutos
2. **Tweet Detector:** Lógica para identificar tweets nuevos vs ya procesados
3. **OpenAI Processor:** Función que envía tweets a ChatGPT con prompt específico
4. **Slack Sender:** Bot que envía resúmenes formateados al canal
5. **Basic Cache:** SQLite/JSON para recordar tweets ya procesados


### Archivo de Configuración (.env)
```
OPENAI_API_KEY=api_key_proporcionada  
SLACK_WEBHOOK_URL=url_del_canal
SCRAPING_INTERVAL_MINUTES=15
MAX_TWEETS_PER_RUN=10
```
### Prompt Template para ChatGPT
```
Eres un asistente especializado en normativa fiscal argentina. 
Analiza este tweet de @ARCA_Oficial y genera un resumen ejecutivo para contadores:

Tweet: "{tweet_content}"
Fecha: "{tweet_date}"

Responde en formato JSON:
{
  "relevancia": "alta/media/baja",
  "categoria": "normativa/deadline/comunicado/otro",
  "resumen": "resumen en 2-3 líneas",
  "accion_requerida": "qué debe hacer el contador",
  "urgencia": "urgente/normal/informativo",
  "fecha_limite": "si aplica, extraer fecha"
}
```

## 📈 Casos de Uso Específicos

### Escenario 1: Alerta de Deadline Fiscal
```
Tweet ARCA → AI clasifica urgencia → 
Extrae fecha límite → Genera alerta personalizada → 
Envía a Slack con recomendaciones
```

### Escenario 2: Cambio Normativo
```
Serie de tweets sobre nueva resolución → 
AI analiza impacto → Busca en knowledge base → 
Genera resumen ejecutivo → Distribuye segmentado
```

### Escenario 3: Reporte Semanal
```
Recopila tweets de la semana → 
Filtra por relevancia → Agrupa por temas → 
Genera newsletter contable → Programa envío
```

## 🔧 Configuración de Evaluación

### Datos de Prueba
- Histórico de tweets de @ARCA_Oficial (últimos 10 tweets)
- Casos de test con diferentes tipos de comunicados
- Métricas de precisión en clasificación

### Métricas de Éxito
- **Precisión:** >85% en clasificación de relevancia
- **Recall:** >90% en detección de deadlines críticos  
- **Latencia:** <1 minutos desde tweet hasta Slack
- **Satisfacción:** Feedback positivo en format de resúmenes

## 💡 Valor Agregado para Contadores

### Beneficios Inmediatos
- **Ahorro de tiempo:** 3-5 horas semanales por contador
- **Compliance automático:** Cero deadlines perdidos
- **Insights proactivos:** Anticipación a cambios normativos

### ROI Medible
- Reducción de multas por incumplimientos
- Mejora en productividad del equipo contable
- Ventaja competitiva con información temprana

---

*Este challenge combina lo mejor del desarrollo full-stack tradicional con cutting-edge AI, creando una solución real que agregará valor inmediato a profesionales contables.*
