<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contracts extends Model
{
    protected $table = "contracts";
    protected $primaryKey = 'ContractID';


    protected $fillable = [
        'ContractName',
        'ContractTotalLeaveHours'
    ];

    use HasFactory;
}
