<?php

namespace App\Http\Controllers;


use App\Models\Roles;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    /**
     * @OA\Get(
     *     path="/roles/show",
     *     tags={"Roles"},
     *     summary="Retrieve all roles",
     *     description="Fetches a list of all roles from the database",
     *     security={{"BearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Roles fetched successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="roles",
     *                 type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="name", type="string", example="Admin"),
     *                     @OA\Property(property="created_at", type="string", format="date-time", example="2024-12-12T10:00:00Z"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2024-12-12T10:00:00Z")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized access"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error"
     *     )
     * )
     */
    public function show()
    {
        $roles =  Roles::get('*');

        return response()->json(['roles' => $roles], 200);
    }
}
