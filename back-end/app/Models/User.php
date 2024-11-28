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
    public function passwordHasing($value): void
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
