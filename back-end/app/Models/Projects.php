<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;


class Projects extends Model
{
    use HasFactory;

    public function user(): BelongsToMany
    {
        return $this->BelongsToMany(User::class, 'project_user', 'userId', 'projectId   ');
    }
}
