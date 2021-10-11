import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'


// import pages
import Home from './Home';
import VideoDetail from './VideoDetail';


const router =
<Router>
  <Route path="/" exact component={Home} />
  <Route path="/videoDetail/:id" component={VideoDetail} />
</Router>



ReactDOM.render( router ,document.getElementById('root'));


reportWebVitals();
