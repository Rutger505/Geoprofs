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
        Schema::create('user_contract', function (Blueprint $table) {
            $table->foreignId('contracts')->constrained('contracts')->references('ContractID');
            $table->foreignId('users')->constrained('users')->references('id');
            $table->date('ContractStartDate');
            $table->date('ContractEndDate')->nullable();
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
