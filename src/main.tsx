import { createRoot } from 'react-dom/client'

import { App } from './App.tsx'
import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
