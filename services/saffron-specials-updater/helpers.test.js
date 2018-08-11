const {
  getCurrentSpecialsMonthYear,
  getSpecials,
} = require('./helpers');

test('gets current specials month and year', async () => {
  const { month, year } = await getCurrentSpecialsMonthYear();

  expect(month).toEqual('July-August');
  expect(year).toEqual(2018);
});