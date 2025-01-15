<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectUser extends Model
{

    protected $table = 'project_user';
    public $incrementing = false;
    protected $primaryKey = ['projectId', 'userId'];
    protected $fillable = ['projectId', 'userId'];
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
}
