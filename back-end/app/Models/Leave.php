<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    protected $table = "leave";
    protected $primaryKey = 'LeaveID';

    use HasFactory;

    protected $fillable = [
        'LeaveStartDate',
        'LeaveEndDate',
        'LeaveReason',
        'Status',
        'LeaveCategory',
        'UserID'

    ];
}
