<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    protected $primaryKey = 'RoleID';
    protected $table = "roles";


    use HasFactory;

    protected $fillable = [
        'RoleName',
    ];
}
