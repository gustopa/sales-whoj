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
        DB::statement("CREATE VIEW `vw_sysapproval_loglist` AS select `" . env('DB_DATABASE') . "`.`sysapproval_log`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`seq` AS `seq`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`employee_id` AS `employee_id`,`" . env('DB_DATABASE') . "`.`sysemployee`.`name` AS `employee_id_txt`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`groupapproval_id` AS `groupapproval_id`,`" . env('DB_DATABASE') . "`.`sysgroupapproval`.`name` AS `groupapproval_id_txt`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`approvalgroup_type` AS `approvalgroup_type`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`rejection_type` AS `rejection_type`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`is_current` AS `is_current`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysapproval_log`.`modified_by` AS `modified_by` from ((`" . env('DB_DATABASE') . "`.`sysapproval_log` left join `" . env('DB_DATABASE') . "`.`sysemployee` on(`" . env('DB_DATABASE') . "`.`sysapproval_log`.`employee_id` = `" . env('DB_DATABASE') . "`.`sysemployee`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`sysgroupapproval` on(`" . env('DB_DATABASE') . "`.`sysapproval_log`.`groupapproval_id` = `" . env('DB_DATABASE') . "`.`sysgroupapproval`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysapproval_loglist`");
    }
};
