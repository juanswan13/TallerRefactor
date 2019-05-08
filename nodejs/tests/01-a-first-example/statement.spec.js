const statement = require('../../src/01-a-first-example/statement');

test('create a statemen', () => {
  const invoce = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55
      },
      {
        playID: 'as-like',
        audience: 35
      },
      {
        playID: 'othello',
        audience: 40
      }
    ]
  };

  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' }
  };

  expect(statement(invoce, plays)).toMatchSnapshot();
});

test('type does not exists', () => {
  const plays = {
    avenger: {
      name: 'Avenger',
      type: 'science-fiction'
    }
  };

  const invoces = {
    customer: 'New Enterprise',
    performances: [{
      playID: 'avenger',
      audience: 300
    }]
  };

  expect(() => statement(invoces, plays)).toThrowErrorMatchingSnapshot();
});

test('performances with little audience', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' }
  };

  const invoices = {
    customer: 'Alternative Performance',
    performances: [
      {
        playID: 'as-like',
        audience: 15
      },
      {
        playID: 'othello',
        audience: 25
      }
    ]
  };

  expect(statement(invoices, plays)).toMatchSnapshot();
});

test('performances with minimal audience', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' }
  };

  const invoices = {
    customer: 'Alternative Performance',
    performances: [
      {
        playID: 'as-like',
        audience: 20
      },
      {
        playID: 'othello',
        audience: 30
      }]
  };

  expect(statement(invoices, plays)).toMatchSnapshot();
});
