import * as React from 'react';

const RpdText = () => {
  const [text, setText] = React.useState('这是一段文字');

  return (
    <div className="rpd-text">
      { text }
    </div>
  );
};

export default {
  name: 'rpd-text',
  component: RpdText,
};
