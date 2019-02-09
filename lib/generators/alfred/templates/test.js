import alfyTest from 'alfy-test';

describe('<%= name %>', () => {
  it('normal', async () => {
    const alfy = alfyTest();
    const result = await alfy('Rainbow');

    expect(result).toEqual([
      {
        title: 'Unicorn',
        subtitle: 'Rainbow'
      }
    ]);
  });
});
