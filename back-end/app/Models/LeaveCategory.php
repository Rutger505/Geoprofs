<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveCategory extends Model
{

    protected $table = 'leave_category';
    protected $fillable = ['name', 'isPaidLeave'];

    use HasFactory;
}
