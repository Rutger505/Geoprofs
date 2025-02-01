<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Sections extends Model
{
    protected $fillable = ['name'];
    use HasFactory;

    public function user(): BelongsToMany
    {
        return $this->BelongsToMany(User::class, 'section_user', 'userId', 'sectionId');
    }
}
