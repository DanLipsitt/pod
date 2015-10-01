from django.test import TestCase
from .models import PrintPart, SlicedModelFile, SlicedModelRev
try:
    from unittest.mock import Mock
except ImportError:
    from mock import Mock
from model_mommy import mommy


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


class SlicedModelRevTests(TestCase):

    def test_auto_increment(self):
        part = mommy.make(PrintPart)
        model1 = mommy.make(SlicedModelFile)
        model2 = mommy.make(SlicedModelFile)

        rev1 = SlicedModelRev.objects.create(
            part=part, sliced_model=model1
        )
        rev2 = SlicedModelRev.objects.create(
            part=part, sliced_model=model2
        )
        self.assertIsNotNone(rev1.rev)
        self.assertEqual(rev2.rev, rev1.rev+1)
