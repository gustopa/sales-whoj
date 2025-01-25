<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE VIEW `vw_sysapprovallist` AS select `" . env('DB_DATABASE') . "`.`sysapproval`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysapproval`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysapproval`.`mappingapproval_id` AS `mappingapproval_id`,`" . env('DB_DATABASE') . "`.`sysapproval`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`sysapproval`.`approval_for` AS `approval_for`,`" . env('DB_DATABASE') . "`.`sysapproval`.`data_no` AS `data_no`,`" . env('DB_DATABASE') . "`.`sysapproval`.`data_id` AS `data_id`,`" . env('DB_DATABASE') . "`.`sysapproval`.`controller` AS `controller`,`" . env('DB_DATABASE') . "`.`sysapproval`.`last_status` AS `last_status`,`" . env('DB_DATABASE') . "`.`sysapproval`.`submitter_id` AS `submitter_id`,`" . env('DB_DATABASE') . "`.`sysapproval`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysapproval`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysapproval`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysapproval`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysapproval`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysapproval`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`sysapproval`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysapprovallist`");
    }
};
