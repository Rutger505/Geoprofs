<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    protected $table = 'leave';
    protected $fillable = [
        'startDate',
        'endDate',
        'reason',
        'status',
        'categoryId',
        'userId'
    ];


    use HasFactory;
}
