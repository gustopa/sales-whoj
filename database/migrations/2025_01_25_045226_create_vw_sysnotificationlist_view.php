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
        DB::statement("CREATE VIEW `vw_sysnotificationlist` AS select `" . env('DB_DATABASE') . "`.`sysnotification`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysnotification`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysnotification`.`notification_type` AS `notification_type`,`" . env('DB_DATABASE') . "`.`sysnotification`.`approval_id` AS `approval_id`,`" . env('DB_DATABASE') . "`.`sysnotification`.`data_no` AS `data_no`,`" . env('DB_DATABASE') . "`.`sysnotification`.`data_id` AS `data_id`,`" . env('DB_DATABASE') . "`.`sysnotification`.`receiver_id` AS `receiver_id`,`" . env('DB_DATABASE') . "`.`sysnotification`.`module` AS `module`,`" . env('DB_DATABASE') . "`.`sysnotification`.`controller` AS `controller`,`" . env('DB_DATABASE') . "`.`sysnotification`.`is_read` AS `is_read`,`" . env('DB_DATABASE') . "`.`sysnotification`.`title` AS `title`,`" . env('DB_DATABASE') . "`.`sysnotification`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`sysnotification`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysnotification`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysnotification`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysnotification`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysnotification`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysnotification`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`sysnotification`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysnotificationlist`");
    }
};
