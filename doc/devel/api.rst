Pod Manager API
===============

The API is available at ``/api``. All requests must be `authenticated
<#authentication>`_.

An interactive API viewer is available through the browser at the same
endpoint.

Authentication
--------------

HTTP API requests use token authentication. Each user has a separate
token which can be seen at ``/admin/authtoken/token/``.

.. http:any:: /api/

   The below apply to all API endpoints:

   :reqheader Authorization: Required. The format is the literal
      string ``Token`` followed by a space and then the authentication token.
   :statuscode 401: Authentication error.

Printers
--------

.. http:get:: /api/printers/

   List all printers.

   **Example response**:

   .. sourcecode:: http

    HTTP/1.1 200 OK
    Allow: GET, POST, HEAD, OPTIONS
    Content-Type: application/json
    Vary: Accept

    [
        {
            "id": 1,
            "restUrl": "http://pod.example.com/api/printers/1/",
            "url": "http://series1-10001:5000",
            "hostname": "series1-10001",
            "port": 5000
        },
        {
            "id": 2,
            "restUrl": "http://pod.example.com/api/printers/2/",
            "url": "http://series1-10002:5000",
            "hostname": "series1-10002",
            "port": 5001
        }
    ]


Files
-----

.. http:post:: /api/files/

   Upload a file to the Pod Manager. The response will contain a
   unique identifier.

   **Example reponse**:

   .. sourcecode:: http

    HTTP/1.1 201 Created
    Allow: GET, POST, HEAD, OPTIONS
    Content-Type: application/json
    Location: http://pod.example.com/api/files/22/
    Vary: Accept

    {
        "id": 22,
        "restUrl": "http://pod.example.com/api/files/22/",
        "file": "http://pod.example.com/uploads/file.gcode",
        "filename": "file.gcode",
        "createdAt": "2016-04-21T18:42:53.469470Z"
    }

   :formparam file: GCode file.
   :formparam filename: Ignored - stored filename is taken from the
                        multipart data.
   :resjson int id: Unique identifier.
   :resjson url restUrl: API endpoint for the object.
   :resjson url file: Link to the stored file.
   :resjson string filename: The original filename of the upload.
   :resjson timestamp createdAt: Upload timestamp.
   :statuscode 201: Success.

.. http:get:: /api/files/

   View uploaded files.


.. Printer Status
   --------------

   Streaming status for each printer is as described in the Octoprint
   documentation.
