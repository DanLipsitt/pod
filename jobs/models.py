from django.db import models
from django.db.models import Max


class Material(models.Model):
    # fixme: separate app?
    pass


class PrintJob(models.Model):
    pass


class PrintAssembly(models.Model):
    job = models.ForeignKey(PrintJob)


class PrintPart(models.Model):
    assembly = models.ForeignKey(PrintAssembly)
    material = models.ForeignKey(Material)
    quantity_needed = models.IntegerField(default=1)

    def current_sliced_model(self):
        """Most recent sliced model rev."""
        return self.slicedmodelrev_set.latest()


class SourceModelFile(models.Model):
    """Unsliced geometry."""
    pass


class SlicedModelFile(models.Model):
    """Slicer output."""
    source_model = models.ForeignKey(SourceModelFile)
    pass


class SlicedModelRev(models.Model):
    part = models.ForeignKey(PrintPart)
    sliced_model = models.ForeignKey(SlicedModelFile)
    rev = models.IntegerField()

    class Meta:
        unique_together = ('part', 'rev')
        get_latest_by = 'rev'
