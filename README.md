# TBot Para mBlock 

Traslado de las funcionalidades del TBot (Duinobot V2.4) para en entorno de
desarrollo gráfico mBlock 5

La idea del proyecto es permitir el uso del kit TBot en las aulas, con un
entorno de programación en bloques sencillo de utilizar, por la naturaleza de
la plataforma de desarrollo porvista por MakeBlock, se presentarán los archivos
`.c` y `.h` utilizados de forma normal, mientras que el resto del material será
agregado en modalidad de Snapshot a lo largo del desarrollo en el archivo 
`.mext` generado por la plataforma.

Desde luego, créditos a [Marcelo Alejandro Pouzo](https://github.com/chanum) 
por su plugin del TBot para [mBlock 3.4](https://github.com/chanum/mBlockPlugInForTBOT)

## Arbol de directorios

## Categorias de bloques

* Entradas
  - Sensor <n> (número del adc de los sensores)
  - Botón RUN (estado booleano del botón RUN)

* Salidas
  - Led <estado> (establece el estado del LED de la placa)
  - Motor <n> DC <Duty> (establece el DC de una de las dos salidas pwm)

* Otros
  - Sería sensato establecer bloques para el puerto serie
