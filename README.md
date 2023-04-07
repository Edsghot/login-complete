# Proyecto de Login

Este proyecto es un ejemplo de una aplicación de Login que consta de dos partes: el cliente (Client) y el servidor (Server). El cliente está hecho con React y el servidor está hecho con Node.js, Express y Mongoose.

## Instalación

Para utilizar este proyecto, clona el repositorio y navega a cada una de las carpetas para instalar las dependencias.

git clone https://github.com/usuario/proyecto-login.git
cd proyecto-login/Client
npm install
cd ../Server
npm install


## Configuración

Antes de utilizar la aplicación, es necesario configurar algunas variables de entorno. Para ello, crea un archivo `.env` en la carpeta `Server` y agrega las siguientes variables:

## Se crea una archivo dentro de la carpeta server

config.js:

export default{
    JWT_SECRET: "ralbfDw55cReslKoeACfD81tnqfue0fPouoMVx6cNwk="
}

## Uso

Una vez que hayas instalado las dependencias y configurado las variables de entorno, puedes iniciar la aplicación ejecutando los siguientes comandos en cada una de las carpetas:

cd Client
npm start

cd Server
npm start



El cliente se ejecutará en `http://localhost:3000` y el servidor en `http://localhost:5000`. Si todo ha sido configurado correctamente, podrás registrarte e iniciar sesión en la aplicación.

## Contribución

Si deseas contribuir a este proyecto, sigue los siguientes pasos:

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b nueva-funcionalidad`)
3. Haz tus cambios y haz commit de ellos (`git commit -am 'Agrega una nueva funcionalidad'`)
4. Haz push a la rama (`git push origin nueva-funcionalidad`)
5. Abre un pull request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más información.
