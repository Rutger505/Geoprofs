<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('UserID', 'id');
            $table->renameColumn('UserFirstName', 'first_name');
            $table->renameColumn('UserLastName', 'last_name');
            $table->renameColumn('DateHired', 'date_hired');
            $table->renameColumn('UserRoleID', 'role_id');
        });

        Schema::table('roles', function (Blueprint $table) {
            $table->renameColumn('RoleID', 'id');
            $table->renameColumn('RoleName', 'name');
        });

        Schema::table('sections', function (Blueprint $table) {
            $table->renameColumn('SectionID', 'id');
            $table->renameColumn('SectionName', 'name');
        });

        Schema::table('section_user', function (Blueprint $table) {
            $table->renameColumn('SectionID', 'section_id');
            $table->renameColumn('UserID', 'user_id');
        });


        Schema::table('projects', function (Blueprint $table) {
            $table->renameColumn('ProjectID', 'id');
            $table->renameColumn('ProjectName', 'name');
        });

        Schema::table('project_user', function (Blueprint $table) {
            $table->renameColumn('ProjectID', 'project_id');
            $table->renameColumn('UserID', 'user_id');
        });


        Schema::table('contracts', function (Blueprint $table) {
            $table->renameColumn('ContractID', 'id');
            $table->renameColumn('ContractName', 'name');
            $table->renameColumn('ContractTotalLeaveHours', 'total_leave_hours');
        });


        Schema::table('days', function (Blueprint $table) {
            $table->renameColumn('DayID', 'id');
            $table->renameColumn('DayName', 'name');
        });


        Schema::table('leave_category', function (Blueprint $table) {
            $table->renameColumn('CategoryID', 'id');
            $table->renameColumn('LeaveCategoryName', 'name');
            $table->renameColumn('LeaveCategoryIsPaidLeave', 'is_paid_leave');
        });

        Schema::table('leave', function (Blueprint $table) {
            $table->renameColumn('LeaveID', 'id');
            $table->renameColumn('LeaveStartDate', 'start_date');
            $table->renameColumn('LeaveEndDate', 'end_date');
            $table->renameColumn('LeaveReason', 'reason');
            $table->renameColumn('LeaveCategory', 'category_id');
        });

        Schema::table('user_contract', function (Blueprint $table) {
            $table->renameColumn('ContractStartDate', 'start_date');
            $table->renameColumn('ContractEndDate', 'end_date');
            $table->renameColumn('ContractID', 'contract_id');
            $table->renameColumn('UserID', 'user_id');
        });

        Schema::table('contract_days', function (Blueprint $table) {
            $table->renameColumn('WorkStartHourDay', 'start_hour');
            $table->renameColumn('WorkEndHourDay', 'end_hour');

            $table->renameColumn('DayID', 'day_id');
            $table->renameColumn('ContractID', 'contract_id');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('id', 'UserID');
            $table->renameColumn('first_name', 'UserFirstName');
            $table->renameColumn('last_name', 'UserLastName');
            $table->renameColumn('date_hired', 'DateHired');
            $table->renameColumn('role_id', 'UserRoleID');
        });

        Schema::table('roles', function (Blueprint $table) {
            $table->renameColumn('id', 'RoleID');
            $table->renameColumn('name', 'RoleName');
        });

        Schema::table('sections', function (Blueprint $table) {
            $table->renameColumn('id', 'SectionID');
            $table->renameColumn('name', 'SectionName');
        });

        Schema::table('section_user', function (Blueprint $table) {
            $table->renameColumn('section_id', 'SectionID');
            $table->renameColumn('user_id', 'UserID');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->renameColumn('id', 'ProjectID');
            $table->renameColumn('name', 'ProjectName');
        });

        Schema::table('project_user', function (Blueprint $table) {
            $table->renameColumn('project_id', 'ProjectID');
            $table->renameColumn('user_id', 'UserID');
        });

        Schema::table('contracts', function (Blueprint $table) {
            $table->renameColumn('id', 'ContractID');
            $table->renameColumn('name', 'ContractName');
            $table->renameColumn('total_leave_hours', 'ContractTotalLeaveHours');
        });

        Schema::table('days', function (Blueprint $table) {
            $table->renameColumn('id', 'DayID');
            $table->renameColumn('name', 'DayName');
        });


        Schema::table('leave_category', function (Blueprint $table) {
            $table->renameColumn('id', 'CategoryID');
            $table->renameColumn('name', 'LeaveCategoryName');
            $table->renameColumn('is_paid_leave', 'LeaveCategoryIsPaidLeave');
        });

        Schema::table('leave', function (Blueprint $table) {
            $table->renameColumn('id', 'LeaveID');
            $table->renameColumn('start_date', 'LeaveStartDate');
            $table->renameColumn('end_date', 'LeaveEndDate');
            $table->renameColumn('reason', 'LeaveReason');
            $table->renameColumn('category_id', 'LeaveCategory');
        });

        Schema::table('user_contract', function (Blueprint $table) {
            $table->renameColumn('start_date', 'ContractStartDate');
            $table->renameColumn('end_date', 'ContractEndDate');
            $table->renameColumn('contract_id', 'ContractID');
            $table->renameColumn('user_id', 'UserID');
        });


        Schema::table('contract_days', function (Blueprint $table) {

            $table->renameColumn('day_id', 'DayID');
            $table->renameColumn('contract_id', 'ContractID');
            $table->renameColumn('start_hour', 'WorkStartHourDay');
            $table->renameColumn('end_hour', 'WorkEndHourDay');
        });
    }
};
