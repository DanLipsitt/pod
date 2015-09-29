from django.test import TestCase
from .models import PrintPart, SlicedModelFile, SlicedModelRev
try:
    from unittest.mock import Mock
except ImportError:
    from mock import Mock


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
        part = Mock(spec=PrintPart, _state=Mock(), id=1)
        model1 = Mock(spec=SlicedModelFile, _state=Mock(), id=1)
        model2 = Mock(spec=SlicedModelFile, _state=Mock(), id=2)

        rev1 = SlicedModelRev(part=part, sliced_model=model1)
        rev2 = SlicedModelRev(part=part, sliced_model=model2)
        self.assertEqual(rev2, rev1+1)
