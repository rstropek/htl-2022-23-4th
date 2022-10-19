export type Ticket = {
  date: Date;
  id: string;
  from: string;
  to: string;
  price: number;
  passenger: string;
  time: number;
}

export let demoTickets: Ticket[] = [
  {
    date: new Date('2007-07-04T00:00:00'),
    id: 'XE34AV6',
    from: 'Cybertron',
    to: 'Earth',
    price: 499.99,
    passenger: 'Optimus Prime',
    time: 0,
  },
  {
    date: new Date('2005-08-20T00:00:00'),
    id: 'U9XZLR9',
    from: 'Cybertron',
    to: 'Earth',
    price: 349.99,
    passenger: 'Bumblebee',
    time: 0,
  },
  {
    date: new Date('1947-03-20T00:00:00'),
    id: 'K40JS7V',
    from: 'Krypton',
    to: 'Earth',
    price: 139.99,
    passenger: 'Kal-El',
    time: 0,
  },
  {
    date: new Date('2154-10-08T00:00:00'),
    id: 'ACXC43O',
    from: 'Earth',
    to: 'Pandora',
    price: 89.99,
    passenger: 'Jake Sully',
    time: 1,
  },
  {
    date: new Date('2929-01-15T00:00:00'),
    id: 'ZA34SD0',
    from: 'Decapod 10',
    to: 'Earth',
    price: 1999.99,
    passenger: 'Dr. John Zoidberg',
    time: 1,
  },
  {
    date: new Date('2042-01-31T00:00:00'),
    id: 'M424242',
    from: 'Earth',
    to: 'Magrathea',
    price: 4242.42,
    passenger: 'Arthur Dent',
    time: 1,
  },
];

export let bases = new Map([
  ['Cybertron', 'assets/cybertron.jpg'],
  ['Earth', 'assets/earth.jpg'],
  ['Krypton', 'assets/krypton.jpg'],
  ['Pandora', 'assets/pandora.jpg'],
  ['Arrakis', 'assets/arrakis.jpg'],
  ['Tatooine', 'assets/tatooine.jpg'],
  ['Vulcan', 'assets/vulcan.png'],
  ['Decapod 10', 'assets/decapod-10.jpg'],
  ['Magrathea', 'assets/magrathea.png'],
]);
