<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Hash;

class User extends Model
{
    protected $hidden = [
        'password',
        'registration_token',
    ];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Roles::class, 'role_id', 'id');
    }

    public function isAdmin(): bool
    {
        return $this->getRoleName() === 'Admin';
    }

    public function getRoleName(): string
    {
        if ($this->role_name === null) {
            $this->loadRoleName();
        }

        return $this->role_name;
    }

    public function loadRoleName(): void
    {
        $role = $this->role()->first();

        if (!$role || empty(trim($role->name))) {
            throw new Exception('User does not have a valid role');
        }

        $this->role_name = $role->name;
    }
}
