# Tower of Hanoi

Tower of Hanoi puzzle written to practice using [Babel](http://babeljs.io/) and [Webpack](https://webpack.js.org/).
A working version can be viewed [here](https://vanillaslice.github.io/tower-of-hanoi/).

## Background
Tower of Hanoi is a mathematical puzzle. It consists of three towers and a number of disks of different sizes, which can slide onto any tower. The puzzle starts with the disks in ascending order of size on the first tower.

The objective of the puzzle is to move the entire stack of disks to the third tower, obeying the following simple rules:

1. Only one disk can be moved at a time.
2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack.
3. No disk may be placed on top of a smaller disk.

With 3 disks, the puzzle can be solved in 7 moves. The minimal number of moves required to solve a Tower of Hanoi puzzle is 2<sup>n</sup> − 1, where n is the number of disks.

See [Wikipedia](https://en.wikipedia.org/wiki/Tower_of_Hanoi) for more information on Tower of Hanoi.

## Installing dependencies
```
yarn install
```

## Running locally
```
yarn start
```

## Building distribution files
```
yarn build
```

## Deploy
```
yarn deploy
```
