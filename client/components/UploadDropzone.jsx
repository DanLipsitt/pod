import React from 'react';
import cookie from 'react-cookie';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';
import 'react-dropzone-component/styles/filepicker.css';

const UploadDropzone = (props) => {
  let config = {
    postUrl: "/api/files/",
  };
  let djsConfig = {
    headers: {"X-CSRFToken": cookie.load('csrftoken')}
  };
  return <DropzoneComponent config={config} djsConfig={djsConfig} />
}

export default UploadDropzone
