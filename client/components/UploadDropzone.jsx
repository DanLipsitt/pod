import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';
import 'react-dropzone-component/styles/filepicker.css';

const UploadDropzone = (props) => {
  let config = {
    postUrl: "/api/files/",
  };
  return <DropzoneComponent config={config} />
}

export default UploadDropzone
