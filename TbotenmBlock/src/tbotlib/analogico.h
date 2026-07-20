#ifndef ANALOGICO_H
#define ANALOGICO_H

#include <stdint.h>

# define S0 0
# define S1 1
# define S2 2
# define S3 3
# define S4 4
# define S5 5

void configurar_analogico(void);
uint16_t leer_sensor(uint8_t sensor);

#endif
