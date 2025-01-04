<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sections extends Model
{
    protected $table = "sections";

    protected $primaryKey = "SectionID";
    protected $fillable = ["SectionName"];
    use HasFactory;
}
