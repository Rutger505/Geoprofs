<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class HealthController extends Controller
{

    /**
     * @OA\Info(
     *     version="1.0",
     *     title="Example for response examples value"
     * ),
     * @OA\PathItem(
     *     path="/health"
     * )
     */
    public function index()
    {
        return response()->json(['status' => 'ok'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
