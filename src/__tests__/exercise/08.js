// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

// Exercise
function Counter() {
  const {count, increment, decrement} = useCounter()

  return (
    <>
      <p>{`Current count: ${count}`}</p>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>increment</button>
    </>
  )
}

// Extra 1
let result
function TestComponent(props) {
  result = useCounter(props)
  return null
}

test('exposes the count and increment/decrement functions', async () => {
  // 🐨 render the component

  // Exercise
  // render(<Counter />)

  // 🐨 get the elements you need using screen
  // const text = screen.getByText(/current count/i)
  // const decrement = screen.getByRole('button', {name: /decrement/i})
  // const increment = screen.getByRole('button', {name: /increment/i})

  // 🐨 assert on the initial state of the hook
  // expect(text).toHaveTextContent('Current count: 0')

  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  // await userEvent.click(decrement)
  // expect(text).toHaveTextContent('Current count: -1')

  // await userEvent.click(increment)
  // await userEvent.click(increment)
  // expect(text).toHaveTextContent('Current count: 1')

  // Extra 1
  render(<TestComponent />)

  // Note, here cannot use destrcture of result since the count value
  // will be stuck at the moment when destructure happens
  // no matter using let or const to denouce the destructure
  // or put the TestComponent definition inside or outside of the testing.
  expect(result.count).toBe(0)

  act(() => {
    result.increment()
  })
  expect(result.count).toBe(1)

  act(() => {
    result.decrement()
  })
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */
