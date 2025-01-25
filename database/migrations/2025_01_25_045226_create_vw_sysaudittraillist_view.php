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
        DB::statement("CREATE VIEW `vw_sysaudittraillist` AS select `" . env('DB_DATABASE') . "`.`sysaudittrail`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysaudittrail`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysaudittrail`.`module_name` AS `module_name`,`" . env('DB_DATABASE') . "`.`sysaudittrail`.`module_action` AS `module_action`,`" . env('DB_DATABASE') . "`.`sysaudittrail`.`module_query` AS `module_query`,`" . env('DB_DATABASE') . "`.`sysaudittrail`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysaudittrail`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysaudittrail`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysaudittrail`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysaudittrail`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysaudittrail`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`sysaudittrail`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysaudittraillist`");
    }
};
