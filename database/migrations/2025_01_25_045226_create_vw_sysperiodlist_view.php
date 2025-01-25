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
        DB::statement("CREATE VIEW `vw_sysperiodlist` AS select `" . env('DB_DATABASE') . "`.`sysperiod`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysperiod`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysperiod`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`sysperiod`.`is_active` AS `is_active`,`" . env('DB_DATABASE') . "`.`sysperiod`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysperiod`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysperiod`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysperiod`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysperiod`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysperiod`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`sysperiod`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysperiodlist`");
    }
};
