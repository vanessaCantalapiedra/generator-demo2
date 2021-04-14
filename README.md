# generator-demo2

## Descripción 
Contiene un generador Yeoman llamado *demo2* con las templatea que crearán la estructura del proyecto base y un sub-generador *entity", el cuál será llamado ya desde el generador padre para
añadir la primera entty.

Se creará un proyecto base que implemente una clean-architecture, heredando de una arquitectura en spring-boot webflux, que podéis encontarla [aquí](https://github.com/vanessaCantalapiedra/base-project-webflux-2.4.3)
con 2 componentes ya definidos.
La arquitectura padre como tal, no tiene gran cosa, es sin más un ejemplo, para ver como encajarían todas las piezas.

Podremos ejecutar tantas veces como queramos el sub-generador entity para añadir una nueva entidad, que añadira todas las clases necesarias para esa entidad y respetando nuesto diseño.

Se puede hacer uso del flag checkJava para  hacer un check de que tenemos instalado la versión 11 de java

Se hace uso de liberŕia como spinner, chalk etc para mejorar el "look & feel" de la consola.

## Instalación

> npm install --global generator-demo2

## Ejecución

> yo demo2 </br>
yo demo2 --checkJava -> chequea la versión de java </br>
yo demo2 miproyecto -> para asignar directamente el nombre del proyecto </br>
yo demo2:entitty -> para ejecutar el instalador que nos generará una nueva enitty
