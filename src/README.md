# App
Este es el directorio raíz, donde está la estructura del proyecto, básicamente se aquí están las definiciones de las responsabilidades del proyecto. 

- **config/**:  esta carpeta está centralizada las configuraciones de base de datos, broker, etc. También tenemos aquí las constantes que veamos útiles. 
- **core/**: este directorio está relacionado con el core del negocio, donde se divide en dos, aplicaciones (casos de usos) y dominio (entidades). Es la parte mas importante del microservicio. 
- **generic/**: clases genéricas que permite reutilizar estructuras comunes. 
- **infra**/: todo lo relacionado a los elementos técnicos que son adaptables a cualquier tecnología, aquí tenemos los controladores, los repositorios, servicios, etc.  
