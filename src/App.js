import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import FileSaver from 'file-saver';
import AceEditor from 'react-ace';
import 'bootstrap/dist/css/bootstrap.min.css';
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/ext-emmet";
import Home from './component';

class App extends Component {
  
  render() {
    return (
      <Home />
      )
    }
}
export default App;