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

## Tabla de entrada/salida

|Puerto|Identificador|     Función     |Entrada|Salida |
|:----:|:------------|:---------------:|:-----:|:-----:|
|  C1  |Sensor 1     |Entrada Analógica|  [x]  |  [ ]  |
|  C2  |Sensor 2     |Entrada Analógica|  [x]  |  [ ]  |
|  C3  |Sensor 3     |Entrada Analógica|  [x]  |  [ ]  |
|  C4  |Sensor 4     |Entrada Analógica|  [x]  |  [ ]  |
|  C5  |Sensor 5     |Entrada Analógica|  [x]  |  [ ]  |
|  B0  |Botón RUN    |Entrada Digital  |  [x]  |  [ ]  |
|  B1  |Pin D9       |Pin Digital      |  [x]  |  [x]  |
|  B2  |Pin D10      |Pin Digital      |  [x]  |  [x]  |
|  B3  |Pin D11      |Pin Digital      |  [x]  |  [x]  |
|  B4  |Pin D12      |Pin Digital      |  [x]  |  [x]  |
|  B5  |Pin D13      |Led Interno      |  [ ]  |  [x]  |
|  D6  |Motor 0      |M0 ENABLE        |  [ ]  |  [x]  |
|  D5  |Motor 0      |M0 D0            |  [ ]  |  [x]  |
|  D7  |Motor 0      |M0 D1            |  [ ]  |  [x]  |
|  D3  |Motor 1      |M1 ENABLE        |  [ ]  |  [x]  |
|  D4  |Motor 1      |M1 D0            |  [ ]  |  [x]  |
|  D2  |Motor 1      |M1 D1            |  [ ]  |  [x]  |
## Categorias de bloques

* tbot
   - Iniciar Programa
   - Sensor [n]
   - Botón RUN [Estado]
   - Motor [n] DC [DC]
   - Led [Estado]
   - Digital [n] [Estado]
   - Digital [n]
