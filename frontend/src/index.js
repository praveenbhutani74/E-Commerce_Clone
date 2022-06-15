import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';
import{positions,transitions,Provider as Alert} from 'react-alert'
import  AlertTemplate from 'react-alert-template-basic';

const options={

      timeout:5000,
      positions:positions.TOP_RIGHT,
      offset: '30px',
      transitions:transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 <Provider store={store} >
       <Alert template={AlertTemplate} {...options}>
       <App />
       </Alert>
      
 </Provider>
  
  
);

