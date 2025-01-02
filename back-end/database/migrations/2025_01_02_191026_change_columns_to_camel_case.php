<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('UserID', 'id');
            $table->renameColumn('UserFirstName', 'firstName');
            $table->renameColumn('UserLastName', 'lastName');
            $table->renameColumn('DateHired', 'dateHired');
            $table->renameColumn('UserRoleID', 'roleId');
            $table->renameColumn('RegistrationStatus', 'registrationStatus');
            $table->renameColumn('RegistrationToken', 'registrationToken');
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
            $table->renameColumn('SectionID', 'sectionId');
            $table->renameColumn('UserID', 'userId');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->renameColumn('ProjectID', 'id');
            $table->renameColumn('ProjectName', 'name');
        });

        Schema::table('project_user', function (Blueprint $table) {
            $table->renameColumn('ProjectID', 'projectId');
            $table->renameColumn('UserID', 'userId');
        });

        Schema::table('contracts', function (Blueprint $table) {
            $table->renameColumn('ContractID', 'id');
            $table->renameColumn('ContractName', 'name');
            $table->renameColumn('ContractTotalLeaveHours', 'totalLeaveHours');
        });

        Schema::table('days', function (Blueprint $table) {
            $table->renameColumn('DayID', 'id');
            $table->renameColumn('DayName', 'name');
        });

        Schema::table('leave_category', function (Blueprint $table) {
            $table->renameColumn('CategoryID', 'id');
            $table->renameColumn('LeaveCategoryName', 'name');
            $table->renameColumn('LeaveCategoryIsPaidLeave', 'isPaidLeave');
        });

        Schema::table('leave', function (Blueprint $table) {
            $table->renameColumn('LeaveID', 'id');
            $table->renameColumn('LeaveStartDate', 'startDate');
            $table->renameColumn('LeaveEndDate', 'endDate');
            $table->renameColumn('LeaveReason', 'reason');
            $table->renameColumn('LeaveCategory', 'categoryId');
            $table->renameColumn('UserID', 'userId');
            $table->renameColumn('Status', 'status');
        });

        Schema::table('user_contract', function (Blueprint $table) {
            $table->renameColumn('ContractStartDate', 'startDate');
            $table->renameColumn('ContractEndDate', 'endDate');
            $table->renameColumn('ContractID', 'contractId');
            $table->renameColumn('UserID', 'userId');
        });

        Schema::table('contract_days', function (Blueprint $table) {
            $table->renameColumn('WorkStartHourDay', 'startHour');
            $table->renameColumn('WorkEndHourDay', 'endHour');
            $table->renameColumn('DayID', 'dayId');
            $table->renameColumn('ContractID', 'contractId');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('id', 'UserID');
            $table->renameColumn('firstName', 'UserFirstName');
            $table->renameColumn('lastName', 'UserLastName');
            $table->renameColumn('dateHired', 'DateHired');
            $table->renameColumn('roleId', 'UserRoleID');
            $table->renameColumn('registrationStatus', 'RegistrationStatus');
            $table->renameColumn('registrationToken', 'RegistrationToken');
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
            $table->renameColumn('sectionId', 'SectionID');
            $table->renameColumn('userId', 'UserID');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->renameColumn('id', 'ProjectID');
            $table->renameColumn('name', 'ProjectName');
        });

        Schema::table('project_user', function (Blueprint $table) {
            $table->renameColumn('projectId', 'ProjectID');
            $table->renameColumn('userId', 'UserID');
        });

        Schema::table('contracts', function (Blueprint $table) {
            $table->renameColumn('id', 'ContractID');
            $table->renameColumn('name', 'ContractName');
            $table->renameColumn('totalLeaveHours', 'ContractTotalLeaveHours');
        });

        Schema::table('days', function (Blueprint $table) {
            $table->renameColumn('id', 'DayID');
            $table->renameColumn('name', 'DayName');
        });

        Schema::table('leave_category', function (Blueprint $table) {
            $table->renameColumn('id', 'CategoryID');
            $table->renameColumn('name', 'LeaveCategoryName');
            $table->renameColumn('isPaidLeave', 'LeaveCategoryIsPaidLeave');
        });

        Schema::table('leave', function (Blueprint $table) {
            $table->renameColumn('id', 'LeaveID');
            $table->renameColumn('startDate', 'LeaveStartDate');
            $table->renameColumn('endDate', 'LeaveEndDate');
            $table->renameColumn('reason', 'LeaveReason');
            $table->renameColumn('categoryId', 'LeaveCategory');
            $table->renameColumn('userId', 'UserID');
            $table->renameColumn('status', 'Status');
        });

        Schema::table('user_contract', function (Blueprint $table) {
            $table->renameColumn('startDate', 'ContractStartDate');
            $table->renameColumn('endDate', 'ContractEndDate');
            $table->renameColumn('contractId', 'ContractID');
            $table->renameColumn('userId', 'UserID');
        });

        Schema::table('contract_days', function (Blueprint $table) {
            $table->renameColumn('startHour', 'WorkStartHourDay');
            $table->renameColumn('endHour', 'WorkEndHourDay');
            $table->renameColumn('dayId', 'DayID');
            $table->renameColumn('contractId', 'ContractID');
        });
    }
};
