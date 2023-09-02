import { timer, interval } from 'rxjs';
import { window, scan, mergeAll } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/transformation/window
// Example 1: Open window specified by inner observable

//emit immediately then every 1s
const srcInterval$ = timer(0, 1000);
const example = srcInterval$.pipe(window(interval(3000)));
const count = example.pipe(scan((acc, curr) => acc + 1, 0));
/*
  "Window 1:"
  0
  1
  2
  "Window 2:"
  3
  4
  5
  ...
*/
const subscribe = count.subscribe((val) => console.log(`Window ${val}:`));
const subscribeTwo = example
  .pipe(mergeAll())
  .subscribe((val) => console.log(val));
