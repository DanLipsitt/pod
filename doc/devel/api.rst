[last updated |today|]

Pod Manager API
===============

There are two parts to the Pod Manager API. Realtime `status updates
<#realtime-printer-status>`_ are served over a websocket. Other
information and operations are available over an HTTP API.

The HTTP API is available at ``/api``. All requests must be
`authenticated <#http-authentication>`_. Also, please note that
trailing slashes are significant for POST requests.

An interactive API viewer is available through the browser at the same
endpoint.

HTTP Authentication
-------------------

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
   unique identifier. The request parameters should be in
   ``multipart/form-data`` format.

   **Example request**

   .. sourcecode:: http

    POST /api/files/ HTTP/1.1
    Authorization: Token 9246bc3063c6f5493a8373827a44faef19d42985
    Content-Type: multipart/form-data; boundary=----FormBoundary

    ----FormBoundary
    Content-Disposition: form-data; name="file"; filename="file.gcode"
    Content-Type: 

    [... file data ...]
    ----FormBoundary

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
   :resjson string filename: Read-only. The original filename of the upload.
   :resjson timestamp createdAt: Upload timestamp.
   :statuscode 201: Success.

.. http:get:: /api/files/

   View uploaded files.


Realtime Printer Status
-----------------------

Streaming status for each printer is available over a websocket. The
`format <http://docs.octoprint.org/en/1.2.11/api/push.html>`_ and
`payload
<http://docs.octoprint.org/en/1.2.11/api/push.html#datamodel>`_
of the messages is described in the OctoPrint documentation, with
added printer identification fields as described below. The URL is as
follows:

``ws://<pod hostname>:9000/``

Message format
~~~~~~~~~~~~~~

The most useful printer message is the `printer event
<http://docs.octoprint.org/en/1.2.11/events/index.html#printing>`_
type, which contains print status changes. The format is as sent by
OctoPrint, with the addition of ``hostname``, ``port``, and
``timestamp`` fields at the top level:

.. code-block:: json

   {
     "host": "localhost",
     "timestamp": "2016-05-03 20:11:39.915133Z",
     "event": {
       "payload": {
         "file": "/uploads/file.gcode",
         "origin": "local",
         "filename": "file.gcode"
       },
       "type": "PrintStarted"
     },
     "port": 5000
   }


The following types of ``event`` message are the most relevant:

* ``PrintStarted``
* ``PrintPaused``
* ``PrintResumed``
* ``PrintCancelled``
* ``PrintDone``

.. warning:: The format of the messages that OctoPrint sends does not
             match its documentation in the following way: the
             ``file`` field contains a full path to the uploaded
             file. there is a separate ``filename`` field that
             contains just the filename.

.. note:: The ``PrintFailed`` is not as useful as it looks. OctoPrint
          sends it every time a print is cancelled, so it is redundant
          with the PrintCancelled event. In addition, differs from the
          other events in that it uses the ``file`` field instead of
          the ``filename`` field.
