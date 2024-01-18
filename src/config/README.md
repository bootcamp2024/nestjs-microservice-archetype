# Config

En este directorio deberíamos tener las configuraciones relacionadas al proyecto, orientado a variables de entorno o a constantes que usuaria el microservicio. 
Usaremos las dependencias de `ConfigService` para obtener las variables de entorno. Esto es necesario para los servidores como brokers, base de datos, cloud, etc. 

> Documentación: https://docs.nestjs.com/techniques/configuration

## Definición de archivos

### usercase.config.ts

Este archivo tiene un builder que nos permite realizar la inmersión de control (IoC), esto nos ayuda a desacoplar el negocio con los componentes de infraestructura. El resultado del builder es generar los provedores con las inyecciones correspondientes.

```js
export const useCasesProvide = new UseCasesProviderBuilder()
.addUseCase(CreateTaskUseCase, TypeOrmTaskRepository, KafkaReminderService)
.build();
```

Se agrega  el caso de uso como primer argumento, los siguiente son las dependencias del caso de uso (se debe respetar el orden de las dependencias).

Las dependencias son las implementaciones que son definidas en la infraestructura.

### swagger.config

Este archivo es la configuración de la documentación de la API, usando swagger, esto es únicamente para las operaciones síncronas con son relacionadas con los controladores.

## database.config.ts

Este archivo es la configuración apropiada para la base de datos (usuario, contraseña, etc...), en este caso se usa las opciones de postgres, se usa `ConfigService` para obtener las variables de entorno.

> Documentación: https://docs.nestjs.com/techniques/database

## broker.config.ts

Este archivo es la configuración apropiada para el borker, en este caso se esta usando kafka, se usa `ConfigService` para obtener las variables de entorno.

> Documentación: https://docs.nestjs.com/microservices/kafka


## constants

Archivos de configuraciones estático