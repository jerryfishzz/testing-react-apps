// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from '../../components/login-submission'
import {handlers} from 'test/server-handlers'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

/* 
// Exercise
// 🐨 get the server setup with an async function to handle the login POST request:
// 💰 here's something to get you started
const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    // Note, this async here is not useful
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(ctx.status(400), ctx.json({message: 'password required'}))
      }
      if (!req.body.username) {
        return res(ctx.status(400), ctx.json({message: 'username required'}))
      }
      return res(ctx.json({username: req.body.username}))
    },
  )
)
// you'll want to respond with an JSON object that has the username.
// 📜 https://mswjs.io/
 */

// Extra 1
const server = setupServer(...handlers)

// 🐨 before all the tests, start the server with `server.listen()`
beforeAll(() => server.listen())
// 🐨 after all the tests, stop the server with `server.close()`
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  // Extra 2
  // const {username, password} = buildLoginForm({ overrides: { password: '' }})

  if (username)
    await userEvent.type(screen.getByLabelText(/username/i), username)
  if (password)
    await userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 uncomment this and you'll start making the request!
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved

  screen.debug()

  // once the login is successful, then the loading spinner disappears and
  // we render the username.
  // 🐨 assert that the username is on the screen
  if (username && password)
    expect(screen.getByText(username)).toBeInTheDocument()
  // Exercise and extra 2

  // Extra 2
  // if (!password) {
  //   expect(screen.getByText('password required')).toBeInTheDocument()
  // }

  // Extra 2
  // if (password && !username) {
  //   expect(screen.getByText('username required')).toBeInTheDocument()
  // }

  // For better solution of extra 2, go to see the final version
})

// Extra 3
test('omitting the password results in an error', async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  // don't type in the password
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})
