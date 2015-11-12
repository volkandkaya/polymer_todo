from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Todo


@csrf_exempt
def todo_list(request):
    if request.method == 'POST':
        print(request.body)
        body = request.body.decode(encoding='UTF-8')
        body = json.loads(body)
        Todo.objects.all().delete()
        for bod in body:
            Todo.create_todo(bod)
        return JsonResponse({'status': 200})
    else:
        todos = Todo.objects.all()
        return render(request, 'todo/todo_list.html', {'todos': todos})
