<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveRequest;
use App\Models\Leave;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'admin') {
            $leaves = Leave::with('user')->get();
        } else {
            $leaves = Leave::where('user_id', $user->id)->get();
        }
        return response()->json($leaves);
    }

    public function store(LeaveRequest $request)
    {
        $leave = Leave::create([
            'user_id' => auth()->id(),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'reason' => $request->reason,
        ]);

        return response()->json($leave, 201);
    }

    public function update(Request $request, Leave $leave)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $leave->update($validated);

        return response()->json($leave);
    }
}