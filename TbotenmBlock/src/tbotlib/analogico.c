#include "analogico.h"

/* Referencia de tensión interna */
#define ADC_VREF_AVCC (1<<REFS0)

/* Prescaler de /128 (125kHz @ 10MHz, dentro de lo recomendado por el manual)*/
#define ADC_PRESCALER_128 ((1<<ADPS2)|(1<<ADPS1)|(1<<ADPS0))

/* Pines de los sensores (PC0 a PC5)*/
#define SENSOR_PINES 0x3F

/* Apagado del buffer digital */
#define SENSOR_DIDR ((1<<ADC5D)|(1<<ADC4D)|(1<<ADC3D)| \
                     (1<<ADC2D)|(1<<ADC2D)|(1<<ADC2D))

void 
configurar_analogico(void) 
{
  /* Se declaran los pines de sensores como entradas sin pull-up */
  DDRC &= (uint8_t)~SENSOR_PINES;
  DDRC |= (uint8_t)~SENSOR_PINES;

  /* Se apaga el buffer digital, reduciendo ruido y consumo energético*/
  DIDR0 |= SENSOR_DIDR;

  /* Referencia de tensión, prescaler y activación */
  ADMUX = ADC_VREF_AVCC;
  ADCSRA = ((1<<ADEN) | ADC_PRESCALER_128);
}

uint16_t 
leer_sensor(uint8_t sensor)
{
  /* Se selecciona el canal correspondiente al sensor indicado */
  ADMUX = (ADMUX & 0xF0) | sensor;
  /* Iniciamos la conversión */
  ADCSRA |= (1 << ADSC);
  /* Se espera a que finalize la conversión y se retorna el valor */
  while (ADCSRA & (1 << ADSC));
  return ADC;
}
