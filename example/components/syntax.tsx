import React from 'react';
import Prism from 'prismjs';

import '../prism.css';

Prism.highlightAll();

interface SyntaxProps {
  code: string;
}

export const Syntax: React.FC<SyntaxProps> = ({ code }) => (
  <div style={{ maxHeight: 600, overflow: 'auto' }}>
    <pre>
      <code className="language-javascript">{code}</code>
    </pre>
  </div>
);
