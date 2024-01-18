# Application

## Caso de uso
En el directorio de aplicación tenemos los casos de usos, los casos de uso son acciones concretas, aquí velamos por ser bastante limpios en el código, dado que puede ser susceptible a modificaciones. Un caso de uso debe tener una única responsabilidad, es decir debe tener un solo método público, esto con el fin de garantizar la cohesión y el bajo acoplamiento. 

### Ejemplo de Caso de Uso

```typescript
export class CreateTaskUseCase implements 1️⃣ UseCase<CreateTaskRequest, CreateTaskResponse>
{
  2️⃣ constructor(
       private readonly repository: TaskRepository,
       private readonly service: Emmiter,
    ) {}

  3️⃣ execute(data: CreateTaskRequest): Promise<CreateTaskResponse> {
        return this.repository
            .createTask(data.title, data.description)
            .then((result) => ({
                id: result.id,
            }))
            .then((response) => {
                this.service.sendMessage(
                new TaskCreated(
                    response.id,
                    data.title.get(),
                    data.description.get(),
                ),
                );
                return response;
            })
            .catch((error) => {
                throw new CreateTaskException(400, 'Could not save task', error);
            });
  }
}
 ```

 1. Usamos la interfaz que tenemos en el directorio de genericos, esto simplemente es un Template que deseamos tener en todos los casos de usos, con un estilo de ejecución Command.
 
 2. Dentro del constructor se tiene las dependencias del caso de uso, estas dependencias deben ser o repositorios o servicios, en ambos casos sería interfaces que luego mas adelante se implementa según sea el componente técnico.

 3. Estamos usando una interfaz que nos obliga a seguir un estandar, en este caso requerimos implementar el metodo `execute`, este metodo tiene como entrada el tipo definidos en el caso de uso en la interfaz y como salida una promesa con la segunda definición de la interfaz. 

> Los tipos request/response puede estar en otro archivo si se desea compartir estos objetos 

## Servicios
Un servicio es una interfaz con la intención de negocio de obtener o realizar alguna acción bajo un contexto determinado. Son interfaces porque no queremos conocer que tecnología seria usada en estos llados, pueden ser tanto como servicios rest o como servicios de mensajería. 

### Ejemplo de Servicio

```typescript
1️⃣ export class TaskCreated extends DomainEvent {
        constructor(
            public id: number,
            public title: string,
            public description: string,
        ) {
            super('demo.taskcreated');
        }

        toSerialize(): string {
            return JSON.stringify(this);
        }
    }

2️⃣ export interface Emmiter {
      sendMessage(message: TaskCreated): Promise<void>;
   }
```

1. Este es un evento de dominio, pero tambien puede ser usado un objeto de valor o simplemente un DTO, en este caso como tal la intención es enviar un mensaje, entonces un evento de dominio es lo mejor en este caso. (Los eventos de dominio los estan con mayor detalle en el directorio de generic)
2. Es una interfaz, con un argumentos de entrada y con respuestas especificas, esto nos ayuda mucho a la hora de realizar pruebas en los casos de usos y a desacoplar la tecnología.

> El evento de dominio puede estar en otro archivo si se desea compartir el objeto

