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
        Schema::create('role_capabilities', function (Blueprint $table) {
            $table->foreignId('RoleID')->constrained('roles')->references('RoleID');
            $table->foreignId('CapabilityID')->constrained('capabilities')->references('CapabilityID');
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
