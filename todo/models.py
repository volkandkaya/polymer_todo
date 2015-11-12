from django.db import models


class Todo(models.Model):
    todo = models.TextField()

    def create_todo(dic):
        b = Todo(todo=dic['value'])
        b.save()

    def __str__(self):
        return self.todo
