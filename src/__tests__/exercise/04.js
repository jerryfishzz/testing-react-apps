// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker' // Extra 2, 3
import Login from '../../components/login'
// import {build, fake} from '@jackfranklin/test-data-bot'

// Extra 2
// function buildLoginForm() {
//   return {
//     username: faker.internet.userName(),
//     password: faker.internet.password(),
//   }
// }

// Extra 3
function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  }
}

// const loginBuilder = build('Login', {
//   fields: {
//     username: fake(f => f.name.findName()),
//     password: fake(f => f.internet.password()),
//   },
// })

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)

  // Exercise
  // let submittedData
  // const handleSubmit = data => (submittedData = data)

  // Extra 1
  const handleSubmit = jest.fn()

  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop

  // Exercise
  // render(<Login onSubmit={handleSubmit} />)

  // Extra 1
  render(<Login onSubmit={handleSubmit} />)

  screen.debug()

  //
  // 🐨 get the username and password fields via `getByLabelText`
  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)

  // Exercise, extra 1
  // const {username, password} = loginBuilder({
  //   overrides: {
  //     password: 'abc',
  //   },
  // })

  // Extra 2
  // const {username, password} = buildLoginForm()

  // Extra 3
  const {username, password} = buildLoginForm({password: 'abc'})

  console.log(username)
  console.log(password)

  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordInput, password)

  //
  // 🐨 click on the button with the text "Submit"
  const button = screen.getByRole('button', {name: /submit/i})
  await userEvent.click(button)

  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue

  // Exercise
  // expect(submittedData).toEqual({username: username, password: password})

  // Extra 1, 2
  // expect(handleSubmit).toHaveBeenCalledWith({
  //   username: username,
  //   password: password,
  // })

  // Extra 3
  expect(handleSubmit).toHaveBeenCalledWith({
    username: username,
    password: 'abc',
  })
})

/*
eslint
  no-unused-vars: "off",
*/
