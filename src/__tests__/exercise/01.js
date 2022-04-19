// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div')

  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div)

  // 🐨 use createRoot to render the <Counter /> to the div
  const root = createRoot(div)
  act(() => root.render(<Counter />))

  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  const [decrement, increment] = div.querySelectorAll('button')
  // Note, the node list can be destructured into array.

  const message = div.firstChild.querySelector('div')

  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe('Current count: 0')

  // 🐨 click the increment button (💰 act(() => increment.click()))
  // act(() => increment.click())

  // Extra 1
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0, // Left mouse key
  })
  act(() => increment.dispatchEvent(incrementClickEvent))


  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 1')

  // 🐨 click the decrement button (💰 act(() => decrement.click()))
  // act(() => decrement.click())

  // Extra 1
  // No idear why the two events can't use one instance instead
  // since the initial value is just same.
  // I used incrementClickEvent to try it in decrementClickEvent, it worked.
  // Guess something will be talked later in the tutorial about this.
  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  act(() => decrement.dispatchEvent(decrementClickEvent))

  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 0')

  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // div.remove() 
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak.
  // Note, the above code won't get executed if something wrong before it. Not best solution.
  // Use beforeEach for the better solution instead of this.
})

/* eslint no-unused-vars:0 */
