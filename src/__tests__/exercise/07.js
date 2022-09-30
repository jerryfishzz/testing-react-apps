// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
// import {render, screen} from '@testing-library/react' // Exercise, Extra 1
import {render as rtlRender, screen} from '@testing-library/react' // Extra 2
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

// Extra 2
// Note, follow the tutorial implementation. It's more generic.
function render(ui, option) {
  function Wrapper({children}) {
    return <ThemeProvider initialTheme={option}>{children}</ThemeProvider>
  }

  return rtlRender(ui, {wrapper: Wrapper})
}

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:

  // Exercise
  // function Wrapper({children}) {
  //   return <ThemeProvider initialTheme="light">{children}</ThemeProvider>
  // }

  // Exercise, extra 1
  // render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})

  // Extra 2
  // Note, follow the tutorial implementation. It's more generic.
  render(<EasyButton>Easy</EasyButton>, 'light')

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
  //
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})

/* eslint no-unused-vars:0 */

test('renders with the dark styles for the dark theme', () => {
  // Extra 1
  // function Wrapper({children}) {
  //   return <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  // }

  // render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})

  // Extra 2
  // Note, follow the tutorial implementation. It's more generic.
  render(<EasyButton>Easy</EasyButton>, 'dark')

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})
