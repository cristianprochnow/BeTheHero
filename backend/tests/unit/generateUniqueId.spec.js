const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
  it('should generate an unique ID', () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
  });
});

/**
 * É escrito desta maneira (no Jest, pelo menos), pois está descrevendo 
 * a ação que o teste executará e em seguida vem o processo que será 
 * realizado. É como se houvesse uma "label" para o processo seguinte, 
 * que está como parâmetro.
 * 
 */
