// // //Como era no React 17:
// import { render } from 'react-dom'
// import { App } from './App'
// render(<App />, document.getElementById('root'))


// Como é no React 18:
import { App } from './App'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App/>);