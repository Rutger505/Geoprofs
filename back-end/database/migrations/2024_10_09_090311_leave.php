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
            $table->id('VerlofID');
            $table->dateTime('LeaveStartDate');
            $table->dateTime('LeaveEndDate');
            $table->text('LeaveReden');
            $table->enum('Status', ['pending', 'refused', 'accepted']);
            $table->foreignId('leave_category')->constrained('leave_category')->references("CategorieID");
            $table->foreignId('UserID')->constrained('users');
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
