import React from 'react';
import cookie from 'react-cookie';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';
import 'react-dropzone-component/styles/filepicker.css';

const UploadDropzone = (props) => {

  const config = {
    postUrl: '/api/files/',
  };

  const djsConfig = {
    headers: {'X-CSRFToken': cookie.load('csrftoken')},
  };

  return <DropzoneComponent config={config} djsConfig={djsConfig} />;

};

export default UploadDropzone;
