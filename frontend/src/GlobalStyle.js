import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background-color: #0a0f1f; /* very dark blue */
    color: white;
  }

  button {
    padding: 10px 20px;
    background-color: #3b82f6; /* light blue */
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #2563eb;
  }

  input, textarea, select {
    padding: 8px;
    border: 1px solid #3b82f6;
    border-radius: 4px;
    background-color: #1e293b; /* darker input */
    color: white;
    margin-bottom: 1rem;
    width: 100%;
  }

  h1, h2, h3, h4 {
    color: white;
  }

  a {
    color: #60a5fa;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default GlobalStyle;
