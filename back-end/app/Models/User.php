<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    protected $primaryKey = 'UserID';

    protected $fillable = [
        'UserFirstName',
        'UserLastName',
        'email',
        'password',
        'DateHired',
        'UserRoleID',
        'RegistrationStatus',
        'RegistrationToken'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'string',
            'DateHired' => 'datetime',
        ];
    }
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    public function isAdmin(): bool
    {
        return Roles::where('RoleID', $this->UserRoleID)->first()->RoleName === 'Admin';
    }

    public function setRoleName(): void
    {
       $this->RoleName = Roles::where('RoleID', $this->UserRoleID)->first()->RoleName;
    }
}
