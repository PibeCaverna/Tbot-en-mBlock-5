#include <avr/io.h>
#include "analogico.h"
void 
configurar_analogico(void) 
{
  /* Establecemos como tensión de referencia el VCC del chip */
  ADMUX = (1<<REFS0);
  /* Habilitamos ADC con prescaler de /128 -> clock de 125k con el chip a 16M*
   * Esto queda dentro del rango recomendado para resolución completa        *
   * (50k-200k)                                                              */
  ADCSRA = (1 << ADEN) | (1 << ADPS2) | (1 << ADPS1) | (1 << ADPS0);
}

uint16_t 
leer_sensor(uint8_t sensor)
{
  /* Se selecciona el canal, enmascarando los bits de REFS */
  ADMUX = (ADMUX & 0xF0) | (sensor & 0x0F);
  /* Iniciamos la conversión */
  ADCSRA |= (1 << ADSC);
  /* Se espera a que finalize la conversión */
  while (ADCSRA & (1 << ADSC));
  return ADC;
}
