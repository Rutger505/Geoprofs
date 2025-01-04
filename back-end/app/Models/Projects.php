<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    protected $table = "projects";
    protected $primaryKey = "ProjectID";
    protected $fillable = ['ProjectName'];
    use HasFactory;
}
