<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class HealthController extends Controller
{

    /**
     * @OA\Info (
     *          version="0.1",
     *          title="API Documentation",
     * )
     * @OA\Get(
     *     path="api/health",
     *     tags={"Health"},
     *     summary="Health check",
     *     description="Health check",
     *     @OA\Response(
     *         response=200,
     *         description="Health check",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="status",
     *                 type="string",
     *                 example="ok"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function index()
    {
        return response()->json(['status' => 'ok'], 200);
    }
}
