import Button from './components/ui/button/button'

export const App = () => {
  return (
    <div>
      <Button variant="primary">Hello</Button>
      <Button variant="primary" as="a" href={'./link'}>
        Hello
      </Button>
    </div>
  )
}
