import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const defaultStyle = {
  height: 'calc(100vh - 80px)',
  width: '100%',
  maxWidth: '100vw',
};

const Page = forwardRef(({
  children,
  title = '',
  style = {},
  ...rest
}, ref) => {
  return (
    <div
      ref={ref}
      style={{...defaultStyle, ...style}}
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;