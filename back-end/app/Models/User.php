<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $primaryKey = 'UserID';

    protected $fillable = [
        'UserFirstName',
        'UserLastName',
        'UserEmail',
        'UserPassword',
        'DateHired',
        'UserRoleID'
    ];

    protected $hidden = [
        'UserPassword',
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
            'UserPassword' => 'string',
            'DateHired' => 'datetime',
        ];
    }

    public function username()
    {
        return 'UserEmail';  // Your custom email column
    }

    public function getAuthIdentifierName()
    {
        return 'UserEmail';  // Your custom email column
    }

    /**
     * Get the password for the user.
     */
    public function getAuthPassword()
    {
        return $this->UserPassword;  // Your custom password column
    }
}
