<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveCategory extends Model
{

    protected  $fillable = ['name', 'isPaidLeave'];
    
    use HasFactory;
}
