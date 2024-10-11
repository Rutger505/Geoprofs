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
        Schema::create('leave', function (Blueprint $table) {
            $table->id('LeaveID');
            $table->dateTime('LeaveStartDate');
            $table->dateTime('LeaveEndDate');
            $table->text('LeaveReason');
            $table->enum('Status', ['pending', 'denied', 'accepted']);
            $table->foreignId('LeaveCategory')->constrained('leave_category')->references("CategoryID");
            $table->foreignId('UserID')->constrained('users')->references('UserID');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
