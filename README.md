[&larr; See my other Open Source projects](https://robinvanbaalen.nl)

# @rvanbaalen/transitionjs
![NPM Downloads](https://img.shields.io/npm/d18m/%40rvanbaalen%2Ftransitionjs)
![GitHub License](https://img.shields.io/github/license/rvanbaalen/transitionjs)
![NPM Version](https://img.shields.io/npm/v/%40rvanbaalen%2Ftransitionjs)

# TransitionJS

Dead simple JavaScript functions to use TailwindCSS transitions without libraries.

## Overview

TransitionJS is a lightweight JavaScript utility that provides easy-to-use transition functions for TailwindCSS. With a few simple methods, you can animate the entry and exit of elements using predefined transition styles like fade and slide.

**Note:** Make sure to include the accompanying `transitions.css` file in your project. This file defines the necessary TailwindCSS classes for the transitions to work correctly.

## Features

- **Fade Transitions:** Easily fade elements in and out.
- **Slide Transitions:** Slide elements up or down smoothly.
- **Toggle Transitions:** Switch between two elements with a cross-fade or slide effect.
- **Async/Await Friendly:** All transition functions are asynchronous and can be used with async/await.
- **Custom Animations:** Extend or create your own animations by following the provided naming conventions.

## Installation

Install the package using [npm](https://www.npmjs.com/):

```bash
npm install @rvanbaalen/transitionjs
```

## Usage

First, import the functions you need from the package:

```javascript
import { enter, leave, fadeIn, fadeOut, slideUp, slideDown, toggleTransition } from '@rvanbaalen/transitionjs';
```

### Basic Examples with Async/Await

Below are a few examples demonstrating how to use the functions with async/await.

#### Fade In / Fade Out

To fade an element in:

```javascript
async function showElement() {
  const element = document.getElementById('my-element');
  
  // Fade in the element
  await fadeIn(element);
  console.log('Element has been faded in.');
}

showElement();
```

To fade an element out:

```javascript
async function hideElement() {
  const element = document.getElementById('my-element');
  
  // Fade out the element
  await fadeOut(element);
  console.log('Element has been faded out.');
}

hideElement();
```

#### Slide Up / Slide Down

To slide an element up (make it visible):

```javascript
async function slideElementUp() {
  const element = document.getElementById('my-element');
  
  // Slide up (enter) the element
  await slideUp(element);
  console.log('Element has been slid up.');
}

slideElementUp();
```

To slide an element down (hide it):

```javascript
async function slideElementDown() {
  const element = document.getElementById('my-element');
  
  // Slide down (leave) the element
  await slideDown(element);
  console.log('Element has been slid down.');
}

slideElementDown();
```

#### Toggle Transition Between Two Elements

Toggle between two elements with a fade transition:

```javascript
async function toggleElements() {
  const elementOne = document.getElementById('element-one');
  const elementTwo = document.getElementById('element-two');
  
  // Determine the current state based on visibility (using 'hidden' class)
  const currentState = !elementOne.classList.contains('hidden');
  await toggleTransition([elementOne, elementTwo], { state: currentState, transition: 'fade' });
  console.log('Toggle transition completed.');
}

toggleElements();
```

## Custom Animations and CSS Naming Conventions

TransitionJS uses a set of CSS naming conventions to determine how transitions are applied. The default animations (like fade and slide) follow this pattern:

- `<name>-enter`: Applied when the element starts entering.
- `<name>-enter-from`: Initial state before the transition.
- `<name>-enter-to`: Final state after the transition.
- `<name>-leave`: Applied when the element starts leaving.
- `<name>-leave-from`: Initial state before leaving.
- `<name>-leave-to`: Final state after the transition.

**Creating Custom Animations:**

If you'd like to create your own custom animations, follow these guidelines:

1. **Define the CSS Classes:**  
   Create or extend your CSS file (for example, `custom-transitions.css`) and define your custom classes following the naming conventions.

   Example for a custom animation ("bounce"):

   ```css
   /* custom-transitions.css */
   .bounce-enter,
   .bounce-leave {
       transition: transform 0.5s ease;
   }
   .bounce-enter-from,
   .bounce-leave-to {
       transform: scale(0.5);
   }
   .bounce-enter-to,
   .bounce-leave-from {
       transform: scale(1);
   }
   ```

2. **Use the Custom Transition in Your JavaScript:**  
   Simply invoke the transition functions with your custom animation name as the `transition` parameter.

   ```javascript
   async function bounceElement() {
     const element = document.getElementById('my-element');
     
     // Use custom bounce animation to show the element
     await enter({ element, transition: 'bounce' });
     console.log('Element has been bounced in.');
     
     // Later, use the bounce animation to hide the element
     await leave({ element, transition: 'bounce' });
     console.log('Element has been bounced out.');
   }
   
   bounceElement();
   ```

**Naming Convention Rules:**
- The animation name should be a simple, lowercase string without spaces (e.g., `fade`, `slide-up`, `bounce`).
- Suffix the animation name with `-enter`, `-enter-from`, `-enter-to`, `-leave`, `-leave-from`, and `-leave-to` respectively.
- Ensure consistency between how you define your CSS classes and how you refer to them in the JavaScript functions.

By following these guidelines, you can easily create and integrate your custom animations with TransitionJS.

## How It Works

TransitionJS uses TailwindCSS utility classes (and custom CSS, if provided) to apply transitions. The functions work by adding and removing these CSS classes to trigger transitions on the HTML elements.

### Internal Workflow

- **Enter Transition:**  
  The function adds the entering classes, waits for the next frame, and then switches to the final state classes, allowing the CSS transition to animate the element into view.

- **Leave Transition:**  
  The leave counterpart functions similarly by applying the leaving classes, handling the transition, and finally hiding the element.

Helper functions such as `nextFrame` (to wait for the next animation frame) and `afterTransition` (to wait until the transition duration completes) are used internally to ensure smooth transitions.

## License

TransitionJS is released under the [MIT License](./LICENSE).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/rvanbaalen/transitionjs).

## Reporting Issues

If you encounter any bugs or have suggestions for improvements, please report them on the [issues page](https://github.com/rvanbaalen/transitionjs/issues).

---

Happy coding!
