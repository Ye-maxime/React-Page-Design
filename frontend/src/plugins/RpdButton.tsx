import * as React from 'react';

const RpdButton = () => {
  const [text, setText] = React.useState('按钮');

  return (
    <div className="rpd-button">
      { text }
    </div>
  );
};

export default {
  name: 'rpd-button',
  component: RpdButton,
};
