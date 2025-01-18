<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Support\Facades\Hash;

class User extends Model
{
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'dateHired',
        'roleId',
        'registrationStatus',
        'registrationToken'
    ];

    protected $hidden = [
        'password',
        'registrationToken',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Roles::class, 'roleId', 'id');
    }

    public function isAdmin(): bool
    {
        return $this->getRoleName() === 'Admin';
    }

    public function getRoleName(): string
    {
        if ($this->roleName === null) {
            $this->loadRoleName();
        }

        return $this->roleName;
    }

    public function loadRoleName(): void
    {
        $role = $this->role()->first();

        if (!$role || empty(trim($role->name))) {
            throw new Exception('User does not have a valid role');
        }

        $this->roleName = $role->name;
    }

    public function leave(): HasMany
    {
        return $this->hasMany(Leave::class, 'userId', 'id');
    }

    public function section(): HasOneThrough
    {
        return $this->hasOneThrough(
            Sections::class,
            SectionUser::class,
            'userId',
            'id',
            'id',
            'sectionId'
        );
    }
}
