<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionUser extends Model
{
    protected $table = 'section_user';
    public $incrementing = false;
    protected $primaryKey = ['sectionId', 'userId'];
    protected $fillable = ['sectionId', 'userId'];
    use HasFactory;
}
