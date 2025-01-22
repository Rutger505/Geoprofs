<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SectionUser extends Model
{
    protected $table = 'section_user';
    public $incrementing = false;
    protected $primaryKey = ['sectionId', 'userId'];
    protected $fillable = ['sectionId', 'userId'];
    use HasFactory;


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(Sections::class, 'sectionId', 'id');
    }
}
