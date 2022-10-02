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

import {handlers} from '../../test/server-handlers'

import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 🐨 get the server setup with an async function to handle the login POST request:
// 💰 here's something to get you started
const server = setupServer(
  // Exercise
  // rest.post(
  //   'https://auth-provider.example.com/api/login',
  //   async (req, res, ctx) => {
  //     // you'll want to respond with an JSON object that has the username.
  //     // 📜 https://mswjs.io/

  //     // const {username} = await req.json()
  //     // Don't use the example from MSW. The data structures are different.

  //     console.log(req.body.username)

  //     return res(
  //       ctx.json({
  //         username: req.body.username,
  //       }),
  //     )
  //   },
  // ),

  // Extra 1
  ...handlers,
)

// 🐨 before all the tests, start the server with `server.listen()`
beforeAll(() => server.listen())

// 🐨 after all the tests, stop the server with `server.close()`
afterAll(() => server.close())

// Extra 4
afterEach(() => server.resetHandlers())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 uncomment this and you'll start making the request!
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  // screen.debug()

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // once the login is successful, then the loading spinner disappears and
  // we render the username.
  // 🐨 assert that the username is on the screen
  expect(screen.getByText(username)).toBeInTheDocument()
})

// Extra 2
test(`logging in without username`, async () => {
  render(<Login />)
  const {password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // Extra 2
  // expect(screen.getByRole('alert')).toHaveTextContent(/username required/i)

  // Extra 3
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"username required"`,
  )
})

// Extra 4
test(`sends a status code 500 error`, async () => {
  const textErrorMessage = 'Oh no, something bad happened'
  server.use(
    rest.post(
      // note that it's the same URL as our app-wide handler
      // so this will override the other.
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        // your one-off handler here
        return res(ctx.json({message: textErrorMessage}), ctx.status(500))
      },
    ),
  )

  render(<Login />)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // screen.debug()

  expect(screen.getByRole('alert')).toHaveTextContent(textErrorMessage)
})
