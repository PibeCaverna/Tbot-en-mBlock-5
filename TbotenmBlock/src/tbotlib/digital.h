#ifndef DIGITAL_H
#define DIGITAL_H

#include <stdint.h>
#include <avr/io.h>

/* Pines fijos (botón run y led de la placa) */
#define RUN PB0
#define LED PB5

/* Pines congigurables*/
#define D9  PB1
#define D10 PB2
#define D11 PB3
#define D12 PB4

/* Modos de los Pines */
#define ENTRADA 0
#define SALIDA  1

/* Estados digitales */
#define ENCENDIDO 1
#define APAGADO   0

void configurar_digital();
void configurar_pin(uint8_t pin, uint8_t modo);
void escribir_digital(uint8_t pin, uint8_t estado);
uint8_t leer_digital(uint8_t pin);
#endif

