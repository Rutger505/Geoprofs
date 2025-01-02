<?php

namespace App\Models;

use Exception;
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
        if ($this->RoleName === null) {
            $this->setRoleName();
        }

        return $this->RoleName === 'Admin';
    }

    public function setRoleName(): void
    {
        $roleName = Roles::where('RoleID', $this->UserRoleID)->first()->RoleName;

        if ($roleName === null || trim($roleName) === '') {
            throw new Exception('User does not have a role');
        }

       $this->RoleName = $roleName;
    }
}
