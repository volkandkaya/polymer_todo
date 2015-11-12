from django.shortcuts import render, get_list_or_404
import json
from django.views.decorators.csrf import csrf_exempt
from .models import Todo


@csrf_exempt
def todo_list(request):
    if request.method == 'POST':
        print(request.body)
        body = request.body.decode(encoding='UTF-8')
        body = json.loads(body)
        print(body)
        Todo.objects.all().delete()
        for bod in body:
           Todo.create_todo(bod)
    else:
        todos = Todo.objects.all()
        return render(request, 'todo/todo_list.html', {'todos': todos})
