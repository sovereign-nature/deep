import DefaultTheme from 'vitepress/theme'
import './index.css'

import Mermaid from 'vitepress-plugin-mermaid/Mermaid.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.component('Mermaid', Mermaid)
  }
}
