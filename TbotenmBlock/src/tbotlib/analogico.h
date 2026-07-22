#ifndef ANALOGICO_H
#define ANALOGICO_H

#include <stdint.h>
#include <avr/io.h>

#define S0 PC0
#define S1 PC1
#define S2 PC2
#define S3 PC3
#define S4 PC4
#define S5 PC5

void configurar_analogico(void);
uint16_t leer_sensor(uint8_t sensor);

#endif
