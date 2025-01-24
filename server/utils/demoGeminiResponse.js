export default [
  {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "This chat for javascript",
            },
          ],
          role: "model",
        },
      },
    ],
    usageMetadata: { promptTokenCount: 37, totalTokenCount: 37 },
    modelVersion: "gemini-1.5-flash",
  },
  {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "### Hello there!\n\nThis is a response to your greeting.  I hope you",
            },
          ],
          role: "model",
        },
      },
    ],
    usageMetadata: { promptTokenCount: 37, totalTokenCount: 37 },
    modelVersion: "gemini-1.5-flash",
  },
  {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "'re having a great day!\n\nHere's a demonstration of some Markdown",
            },
          ],
          role: "model",
        },
      },
    ],
    usageMetadata: { promptTokenCount: 37, totalTokenCount: 37 },
    modelVersion: "gemini-1.5-flash",
  },

  {
    candidates: [
      {
        content: {
          parts: [
            {
              text: " features:\n\n* **Bold text:** This is bold text.\n* *Italic text:* This is italic text.\n* ***Bold and italic text:",
            },
          ],
          role: "model",
        },
      },
    ],
    usageMetadata: { promptTokenCount: 37, totalTokenCount: 37 },
    modelVersion: "gemini-1.5-flash",
  },

  {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "*** This is both bold and italic.\n* ~~Strikethrough text:~~ This is strikethrough text.\n* [Link to Google](https://www",
            },
          ],
          role: "model",
        },
      },
    ],
    usageMetadata: { promptTokenCount: 37, totalTokenCount: 37 },
    modelVersion: "gemini-1.5-flash",
  },

  {
    candidates: [
      {
        content: {
          parts: [
            {
              text: ".google.com): This is a link to Google.\n* An unordered list:\n    * Item 1\n    * Item 2\n    * Item 3\n* An ordered list:\n    1. First",
            },
          ],
          role: "model",
        },
      },
    ],
    usageMetadata: { promptTokenCount: 37, totalTokenCount: 37 },
    modelVersion: "gemini-1.5-flash",
  },

  {
    candidates: [
      {
        content: {
          parts: [
            {
              text: ' item\n    2. Second item\n    3. Third item\n* A code block:\n```python\nprint("Hello, world!")\n```\n\n> This is a blockquote.  It\'s useful for quoting text.',
            },
          ],
          role: "model",
        },
      },
    ],
    usageMetadata: { promptTokenCount: 37, totalTokenCount: 37 },
    modelVersion: "gemini-1.5-flash",
  },

  {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "\n\nAnd finally, here's a table:\n\n| Header 1 | Header 2 | Header 3 |\n|---|---|---|\n| Row 1, Cell 1Cell 1Cell 1 | Row 1, Cell 2 | Row 1, Cell 3 |\n| Row 2, Cell 1 |",
            },
          ],
          role: "model",
        },
      },
    ],
    usageMetadata: { promptTokenCount: 37, totalTokenCount: 37 },
    modelVersion: "gemini-1.5-flash",
  },

  {
    candidates: [
      {
        content: {
          parts: [
            {
              text: " Row 2, Cell 2 | Row 2, Cell 3 |\n\n\nLet me know if you have any other questions!\n",
            },
          ],
          role: "model",
        },
        finishReason: "STOP",
      },
    ],
    usageMetadata: {
      promptTokenCount: 37,
      candidatesTokenCount: 285,
      totalTokenCount: 322,
    },
    modelVersion: "gemini-1.5-flash",
  },
];
