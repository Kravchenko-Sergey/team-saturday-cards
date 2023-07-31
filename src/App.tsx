import { BrowserRouter } from 'react-router-dom'

import Button from './components/ui/button/button'

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Button variant="primary">Hello</Button>
        <Button variant="primary" as="a" href={'./link'}>
          Hello
        </Button>
      </div>
    </BrowserRouter>
  )
}
