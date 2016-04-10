from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from pod import __version__


@login_required
def index(request):
    return render(request, 'pod/index.html', {
        'version': __version__
    })
