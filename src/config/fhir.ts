import CUSTOM from 'custom/config';

export const FHIR_SUPPORTED_EXTENSION_BASE_URLS = CUSTOM.FHIR_SUPPORTED_EXTENSION_BASE_URLS ?? [
  'http://hl7.org/fhir/StructureDefinition',
  'https://num-compass.science/fhir/StructureDefinition',
];
