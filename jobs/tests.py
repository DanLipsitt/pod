from django.test import TestCase
from .models import PrintPart


class PrintPartTests(TestCase):
    fixtures = ['default.yaml']

    def test_current_sliced_model(self):
        part = PrintPart.objects.get(pk=1)
        self.assertEqual(part.current_sliced_model().pk, 3)
        part.slicedmodelrev_set.create(
            sliced_model_id=1,
            rev=4
        )
        self.assertEqual(part.current_sliced_model().pk, 4)
