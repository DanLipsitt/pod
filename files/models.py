from django.db import models


class PrintFile(models.Model):

    file = models.FileField()
    filename = models.CharField(max_length=256)
    createdAt = models.DateTimeField(auto_now_add=True)


def distribute_file(f, filename, printers):
    import grequests
    from requests_toolbelt import MultipartEncoderMonitor

    url_template = "http://localhost:8081/post#{printer}"

    def make_progress_callback(url):
        def progress(monitor):
            print(url, monitor.bytes_read)
        return progress

    reqs = []
    for printer in printers:
        url = url_template.format(printer=printer)
        callback = make_progress_callback(url)
        data = {'file': (filename, f)}
        monitor = MultipartEncoderMonitor.from_fields(data, callback=callback)
        headers = {'Content-Type': monitor.content_type}
        reqs.append(grequests.post(url, data=monitor, headers=headers))
    return grequests.map(reqs)
