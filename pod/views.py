from django.shortcuts import render
from pod import __version__


def index(request):
    return render(request, 'pod/index.html', {
        'version': __version__
    })
