<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserContract extends Model
{
    use HasFactory;

    protected $table = 'user_contract';

    public $incrementing = false;

    protected $primaryKey = ['sectionId', 'userId'];

    protected $fillable = [
        'userId',
        'contractId',
        'startDate',
        'endDate',
    ];
}
