# Core

En este directorio tenemos la lógica de negocio y los aspectos fundamentales relacionados a las intenciones funcionales inherentes a los aspectos técnicos como base de datos o servicios de interconexión. Tenemos dos conceptos, aplicaciones y dominio.

## Application

Aplicaciones es el directorio en donde tenemos los **casos de uso**, que son los elementos que intervienen con la intención del negocio (guardar, consultar, validar, etc...) y por otro lado tenemos los **servicios**, o también podemos decir que son interfaces orientadas al negocio, con la intención de hacer llamados o consultas externos. 

## Domain

Dominio es el directorio en donde se centra en las **entidades**, aqui esta la información como debería estar estructurada, además tenemos **objetos de valores** que son elementos fundamentales para el dominio como tal y por último tenemos los **repositorios**, estos últimos son interfaces que nos permite hacer tratamiento a las entidades com son guardar, consultar, editar, etc... 
