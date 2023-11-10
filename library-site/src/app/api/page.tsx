'use client'
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import apiDocumentation from './test.json';

const SwaggerComponent = () => {
  return (
    <SwaggerUI spec={apiDocumentation} />
  );
};

export default SwaggerComponent;