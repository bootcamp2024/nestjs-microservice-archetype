# Domain

Dentro de este directorio tenemos lo relacionado a nuestro dominio, aquí tenemos nuestras entidades que representan el negocio del microservicio, es el alcance final de la solución.  También tenemos objetos de valor, que son elementos que hacen parte del dominio y que son tratados de manera independiente y por último tenemos los repositorios, que es el mecanismo para realizar el tratamiento de la información. 

## Entities

Las entidades son la información concreta que deseamos guardar. No somos puristas y trabajos las entidades anímicas, como ejemplo usamos typeorm para definir las entidades. 

> Documentación: https://typeorm.io/entities

## Objects

Los objetos de valor se usan para permitir desde el nivel del dominio dejar las entidades 100% validas a nivel del dato, como tal, desde la perspectiva de ORM se puede agregar constraints pero en ocasiones es limitado a nivel de dominio, por eso se crean los objetos de valor, para que los repositorios recibas solo valores 100% validos, tambien se puede usar como input en los servicios. Al final son elementos que ayudan a desacoplar las validaciones y así no se contamina las reglas de negocio.  

### Ejemplo
```js
export class Title implements 1️⃣ ValueObject<string> {
  2️⃣ constructor(private readonly value: string) {
    if (value !== undefined) {
      if (value.length < 5) {
        throw new IllegalValueException(
          'Title',
          'The Title should be greater than 5 characters',
        );
      }
    } else {
      throw new IllegalValueException('Title', 'The Title must be defined');
    }
  }
  3️⃣ get(): string {
    return this.value;
  }
}
```

1. Es una interfaz que garantiza un modelo adecuado en los objetos de valor, el tipo de datos puede variar según sea la necesidad. 

2. Los valores solo se entregan al constructor, aquí se hace todoas las validaciones y se genera una excepción propia que esta en el directorio generic.

3. Si pasa todas las validaciones en el constructor ya se puede obtener el valor, se garantiza la inmutabilidad del valor, esto es ideal para los valores que se transportan desde una capa a otra. 

> Un objeto de valor puede esta compuerto de un Record

## Repositories

Los repositorios son básicamente interfaces que reciben objetos de valor como argumentos, no se espera que sean entidades concretas porque no se garantiza que la entidad no sea válida en sí (esto puede ser una excepción dado el caso). Al final esta interfaz se implementa en una capa de infraestructura.

> Como regla, un repositorio por entidad. 