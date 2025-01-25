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
        DB::statement("CREATE VIEW `vw_sysapproval_historylist` AS select `" . env('DB_DATABASE') . "`.`sysapproval_history`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`approval_id` AS `approval_id`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`employee_id` AS `employee_id`,`" . env('DB_DATABASE') . "`.`sysemployee`.`name` AS `employee_id_txt`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`status` AS `status`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysapproval_history`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`sysapproval_history` left join `" . env('DB_DATABASE') . "`.`sysemployee` on(`" . env('DB_DATABASE') . "`.`sysapproval_history`.`employee_id` = `" . env('DB_DATABASE') . "`.`sysemployee`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysapproval_historylist`");
    }
};
