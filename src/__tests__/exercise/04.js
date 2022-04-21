// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'
import { build, fake } from '@jackfranklin/test-data-bot'


/* 
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
 */


/* 
// Extra 1
test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  
  render(<Login onSubmit={handleSubmit} />)
  
  const username = 'jerry'
  const password = 'sbwikus'
  
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  const submitButton = screen.getByRole('button', { name: /submit/i })
  await userEvent.click(submitButton)
  
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1) // From tutorial
})
 */


/* 
// Extra 2
function buildLoginForm() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const {username, password} = buildLoginForm()
  
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  const submitButton = screen.getByRole('button', { name: /submit/i })
  await userEvent.click(submitButton)
  
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1) // From tutorial
})
 */


/* 
// Extra 3
function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const {username, password} = buildLoginForm({password: 'abc'})
  
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  const submitButton = screen.getByRole('button', { name: /submit/i })
  await userEvent.click(submitButton)
  
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1) // From tutorial
})
 */


// Extra 4
const loginFormBuilder = build('LoginForm', {
  fields: {
    // Use fake to make sure everytime when this builder is called, 
    // the value will be new.
    // f looks like a built-in module having the same function as faker
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  // Override when using Test Data Bot
  const {username, password} = loginFormBuilder({overrides: {password: 'abc'}})
  console.log(username, password)
  
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  const submitButton = screen.getByRole('button', { name: /submit/i })
  await userEvent.click(submitButton)
  
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1) // From tutorial
})


/*
eslint
  no-unused-vars: "off",
*/
