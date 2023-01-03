import { MermaidMarkdown } from 'vitepress-plugin-mermaid';

export default {
  lang: 'en-US',
  title: 'Sovereign Nature Identifier',
  description: 'Sovereign Identity for the elements of Nature.',
  themeConfig: {
    sidebar: [
      {
        items: [
          { text: 'Intro', link: '/' },
          { text: 'Identifier Structure (DID & DDO)', link: '/did-ddo' },
          { text: 'Smart Contract', link: '/smart-contract' },
          { text: 'Use Cases', link: '/use-cases' },
          { text: 'Nature Identification', link: '/nature-identification' },
        ],
      },
    ],
  },
  markdown: {
    config: MermaidMarkdown,
  },
};
