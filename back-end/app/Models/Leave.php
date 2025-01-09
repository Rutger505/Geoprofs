<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Leave extends Model
{
    protected $table = 'leave';
    protected $fillable = [
        'startDate',
        'endDate',
        'reason',
        'status',
        'categoryId',
        'userId'
    ];

    use HasFactory;

    public function category(): BelongsTo
    {
        return $this->belongsTo(LeaveCategory::class, 'categoryId', 'id');
    }
}
