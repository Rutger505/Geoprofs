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

                $table->string('UserLastName');
                $table->string('UserEmail');
                $table->string('UserPassword');
                $table->date('DateHired')->nullable();
                $table->integer('UserLeaveHours')->nullable();
                $table->foreignId('UserRoleID')->constrained('roles');
                $table->foreignId('ContractID')->constrained('contracts');
                $table->timestamps();
            });
        }
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
