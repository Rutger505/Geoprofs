<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id('UserID');
                $table->string('UserFirstName');
                $table->string('UserLastName');
                $table->string('email');
                $table->string('password');
                $table->date('DateHired')->nullable();
                $table->enum('RegistrationStatus', ['pending', 'created']);
                $table->foreignId('UserRoleID')->constrained('roles')->references('RoleID');
                $table->rememberToken();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
