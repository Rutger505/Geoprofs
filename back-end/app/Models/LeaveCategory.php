<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveCategory extends Model
{
    protected $table = "leave_category";

    protected $primaryKey = "CategoryID";
    protected $fillable = [
        'LeaveCategoryName',
        'LeaveCategoryIsPaidLeave'
    ];
    use HasFactory;
}
