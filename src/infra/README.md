# Infraestructure
En este directorio encontramos todo lo relacionado con las preocupaciones técnicas, aquí tenemos los controladores, la base de datos, los servicios, entre otros.  El acuerdo con cualquier componente de infraestructura, es tenerlo bajo la estructuración de módulo (importar y exportar unicamente lo necesario).

## Controller
Tenemos dos controladores asíncronos y síncronos:
1. Asíncronos: son aquellos que se ejecutan de manera indirecta, normalmente es llamado por medio de un tópico o una cola.
2. Síncrono: esto son controladores que se ejecutan de manera directa, son enfocados a servicios Rest.
> A los controladores se les inyectan casos de usos en su constructor. 

## Database
Tenemos aquí la configuración del typerom (para este ejemplo) y los repositorios implementados, usa las interfaces de los repositorios de dominio. 

## Service
Son los servicios implementados, aquí usan las interfaces de los servicios de las aplicaciones del core.

## Shared
Simplemente son elementos propios del framework, como son los filtros, interceptos, middleware, etc. 
