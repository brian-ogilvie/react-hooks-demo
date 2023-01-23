# React Hooks Demo

A brief demonstration of React Hooks beyond useState.

## Getting Started

This repo contains a few examples to explore some of the hooks (and other React APIs) for optimizing performance of your React app. We'll cover:

- memo
- useMemo
- useCallback
- useDeferredValue

### How to install this demo

1. Fork and clone this repository.
2. Install dependencies with `npm install`.
3. Fire up the app using `npm start`.
4. Go to `localhost:3000` in your browser to view the output.

### Completed vs Starter Code

The `master` branch contains the completed code with all the optimizations we'll discuss. To see the starter code and view its results in the browser, check out the `starter-code` branch:

```
git checkout starter-code
```

## Demo 1: Memoization

With the `starter-code` branch checked out, open [src/demos/MemoDemo.js](./src/demos/MemoDemo.js)

## Demo 2: Deferring a Value

With the `starter-code` branch checked out, open [src/demos/DeferredValueDemo.js](./src/demos/DeferredValueDemo.js)

## References

For more information on

### A thought from Kent C. Dodds on preventing re-renders:

> Let's say that you have to punch yourself in the face every time you blink. Maybe you'd think: "oh gee, I guess I'd better not blink as much!" You know what I say? I say you should stop punching yourself in the face every time you blink! So instead of just reducing how often a bad thing happens (slow renders), maybe you could eliminate the bad thing and feel free to blink (render) as much as your eyes need you to.

In other words, before you reach for any of the tools we've discussed today--which help prevent unecessary re-renders--make sure you've done everything you can to make each render as efficient as possible. Clean up each component first, then worry about optimizing the number of renders. You can read Kent's full article on the subject here: [Fix the slow render before you fix the re-render](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render).
