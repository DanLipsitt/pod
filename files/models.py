from django.db import models


class PrintFile(models.Model):

    f = models.FileField()
    filename = models.CharField(max_length=256)


def distribute_file(f, filename, printers):
    import grequests
    from io import StringIO
    from requests_toolbelt import MultipartEncoderMonitor

    url_template = "http://localhost:8081/post"

    def make_progress_callback(url):
        def progress(monitor):
            print(url, monitor.bytes_read)
        return progress

    reqs = []
    for printer in printers:
        url = url_template.format()
        callback = make_progress_callback(url)
        data = {'gcode': ('filename', StringIO('dummy data'))}
        monitor = MultipartEncoderMonitor.from_fields(data, callback)
        headers = {'Content-Type': monitor.content_type}
        reqs.append(grequests.post(url, data=monitor, headers=headers))
    return grequests.map(reqs)
