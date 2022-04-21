// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

// Excercise
// Go to see the final version. The coding style is better than my solution.
test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  let submittedData
  const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  screen.debug() // Output UI
  //
  // 🐨 get the username and password fields via `getByLabelText`
  const username = screen.getByRole('textbox', { name: /username/i })
  const password = screen.getByLabelText(/password/i)

  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  await userEvent.type(username, 'jerry')
  await userEvent.type(password, 'sbwikus')

  //
  // 🐨 click on the button with the text "Submit"
  const submitButton = screen.getByRole('button', { name: /submit/i })
  await userEvent.click(submitButton)

  //
  // assert that submittedData is correct
  // console.log(submittedData)
  expect(submittedData.username).toBe('jerry')
  expect(submittedData.password).toBe('sbwikus')
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
