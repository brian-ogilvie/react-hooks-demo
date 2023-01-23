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

Forgive the contrived example, but here we have a parent component that renders a simple click counter. When the user clicks the button, the count increases. It also renders a child component, which we'll imagine to have a very expensive render. Maybe it's a map component that has to hit an external API and then do some expensive drawing.

In reality, all this child component does is render the components we pass it via the `coords` prop and invoke an `onRender` callback that also comes via props to let us know every time it renders. If you take a look at the app in your browser with your JS console open, you can see that the child component is rendering every time you click the button to update the count. (Actually, it's rendering twice due to StrictMode in a dev environment. [Here's why.](https://beta.reactjs.org/reference/react/StrictMode#fixing-bugs-found-by-double-rendering-in-development)) This is no big deal in our example, but if the child component was actually a very slow, expensive render, this would be a big performance hit, and for what? The child component actually doesn't care about the value of the click count. It only renders coordinates and invokes a callback, so there's no reason for it to have to re-render. But in React, when a parent component re-renders, by default its entire sub-tree also re-renders.

### Memoization to the rescue!

React offers a few ways to memoize the results of running functions, saving the result, to avoid needing to run those functions again. `React.memo` allows you to memoize an entire component, so that it only needs to be re-rendered if its props change. To use it, simply wrap your component definition in a call to `memo()`:

```
import {memo} from 'react';

const SlowComponent = memo((props) => {...});
```

If you try wrapping `SlowComponent` in `MemoDemo.js` in a call to `memo()`, and head back over to the browser. When you click no the button you'll see... it's not working. The component is still rendering every time. Why?

This has to do with how "equality" really works in JavaScript. In evaluating whether the props have changed, React checks not whether they are equal in content, but whether they are truly the same, as in, the same locations in memory. If your props are primitive values like strings, numbers, or booleans, there's no issue, but look at our `coords` prop. That's an object. Every time the parent component renders, that object is re-declared and saved in a new memory location. It's not truly the same object even thought it's equal to the previous one, so React has no choice but to re-render the child component. How do we fix this?

`React.useMemo` allows you to memoize, not a whole component, but a value within a component. Typically we'd use it to avoid having to run an expensive calculation again, but we can also use it to stabilize the definition of a value for referential equality. `useMemo` takes two arguments:

1. A function to invoke which generates the value
2. An array of dependencies, e.g. values that could change causing us to need to run the function again.

In our toy-code example, `coords` doesn't even have any dependencies. We just want to return the same object every time no matter what. Let's apply `useMemo` to stabilize our `coords` prop:

```
import {useMemo} from 'react';

const coords = useMemo(() => ({
  x: 100,
  y: 200,
}), []);
```

Now if we go back to the browser... it's still not working. As it turns out, we still haven't stabilized all our props. The function `onRender` is also getting a brand new definition every time the parent component renders (In JS, functions are objects). Unfortunately, `useMemo` won't help us here because it's meant to memoize a **value**, the result of having called a function. But we need to memoize the **definition of a function**.

That's what `useCallback` is for. Its signature is the same as `useMemo`, taking two arguments:

1. The function you want to memoize
2. An array of dependencies, e.g. values our function depends on which, if changed, would cause us to need to redefine the function.

Again, in our example, our simple callback doesn't depend on any external values, so the dependency array will be empty:

```
import {useCallback} from 'react';

const onRender = useCallback(() => {
  // do the thing
}, []);
```

Now head back to the browser, maybe clear the JS console, and start clicking the button. Look! The child component only renders initally, and then not again as the count state is updated.

<div style="background-color:skyblue;color:black;padding:8px;margin-bottom:18px"><strong>NOTE:</strong> Should you use memoization for every component and value you have? Absolutely not! Memoization comes at a cost: the space it takes to store previous results in memory. React renders are generally pretty fast, so you only need to reach for memoization when you're sure performance needs to improve.</div>

## Demo 2: Deferring a Value

With the `starter-code` branch checked out, open [src/demos/DeferredValueDemo.js](./src/demos/DeferredValueDemo.js)

## References

For more information on the hooks we discussed, see the new React docs at [https://beta.reactjs.org/](https://beta.reactjs.org/)

- [memo](https://beta.reactjs.org/reference/react/memo)
- [useMemo](https://beta.reactjs.org/reference/react/useMemo)
- [useCallback](https://beta.reactjs.org/reference/react/useCallback)
- [useDeferredValue](https://beta.reactjs.org/reference/react/useDeferredValue)

### A thought from Kent C. Dodds on preventing re-renders:

> Let's say that you have to punch yourself in the face every time you blink. Maybe you'd think: "oh gee, I guess I'd better not blink as much!" You know what I say? I say you should stop punching yourself in the face every time you blink! So instead of just reducing how often a bad thing happens (slow renders), maybe you could eliminate the bad thing and feel free to blink (render) as much as your eyes need you to.

In other words, before you reach for any of the tools we've discussed today--which help prevent unecessary re-renders--make sure you've done everything you can to make each render as efficient as possible. Clean up each component first, then worry about optimizing the number of renders. You can read Kent's full article on the subject here: [Fix the slow render before you fix the re-render](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render).
