#include "digital.h"

void
configurar_digital(void)
{
  /* Configura Botón RUN como entrada sin pull-up */
  DDRB &= (uint8_t)~(1 << RUN);

  /* Configura el led interno como salida y lo inicializa apagado*/
  DDRB  |= (uint8_t) (1 << LED);
  PORTB &= (uint8_t)~(1<< LED)
}

void
configurar_pin(uint8_t pin, uint8_t modo)
{
  if (MODO == SALIDA)
    DDRB |= (uint8_t) (1 << pin);
  else
    DDRB &= (uint8_t)~(1 << pin):
}

void
escribir_digital(uint8_t pin, uint8_t estado)
{
  if (estado == ENCENDIDO)
    PORTB |= (uint8_t) (1 << pin);
  else
    PORTB &= (uint8_t)~(1 << pin);
}

uint8_t 
leer_digital(uint8_t pin)
{
  return (PINB & (1 << pin)) ? ENCENDIDO : APAGADO;
}

