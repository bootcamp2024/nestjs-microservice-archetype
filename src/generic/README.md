# Generic

En este directorio tenemos clases genéricas que podemos liberar en una librería compartida a todos los microservicios. 

### Exception

Tenemos dos tipos de excepciones: 

1. BusinessException: son usadas en los casos de uso, se suele colocar un código para relacionarlo a un estado concreto, ya sea tipo HTTP u otro, además se tiene otras propiedades que describen el error.

2. IllegalValueException: son usadas dentro de los objetos de valor, errores más que todos de validación de valores. 

### Domain
EventEste tipo de objeto es para transporte, es abstracto donde nos permite agregar valores adicionales como son timestamp, al final este objeto es serializable como tal y se debe agregar en el evento de dominio el método de serialización. 

### UseCasesProviderBuilder
Esta clase es un Builder que nos permite crear los proveedores de los casos de usos, inyectando las dependencias que necesitan los casos de usos. 

### UseCase
Esta es una interfaz donde nos genera una manera estandarizada para crear los casos de uso, en donde tenemos una entrada y una salida, así podemos definir a nivel de negocio una caso de prueba desde la definición del negocio.

### ValueObject
Esta es una interfaz donde  generamos una manera estándar para diseñar objetos de valor. 
