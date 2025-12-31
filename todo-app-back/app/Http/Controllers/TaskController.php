<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request){
        $tasks = $request->user()->tasks()->latest()->get();
        return response()->json($tasks, 200);
    }
    public function store(Request $request){
        $validatedData = $request->validate([
            'title'       => 'required|string|max:100',
            'description' => 'nullable|string',
            'priority'    => 'nullable|in:low,medium,high',
        ]);

        $task = $request->user()->tasks()->create($validatedData);

        return response()->json($task, 201);
    }
    public function update(Request $request, Task $task){
        if ($request->user()->id !== $task->user_id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        $validated = $request->validate([
            'title' => 'sometimes|string|max:100',
            'is_completed' => 'sometimes|boolean',
            'priority' => 'sometimes|in:low,medium,high',
        ]);

        $task->update($validated);

        return response()->json([
        'message' => 'Tâche mise à jour !',
        'task' => $task
        ]);
    }
    public function destroy(Request $request,Task $task){
        if ($request->user()->id !== $task->user_id) {
            return response()->json([
            'message' => 'Action non autorisée !'
            ], 403);
        }

        $task->delete();

        return response()->json([
        'message' => 'Tâche supprimée avec succès'
        ], 200);
    }
}
