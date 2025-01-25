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
        DB::statement("CREATE VIEW `vw_sysemployeelist` AS select `" . env('DB_DATABASE') . "`.`sysemployee`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysemployee`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysemployee`.`employee_no` AS `employee_no`,`" . env('DB_DATABASE') . "`.`sysemployee`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`sysemployee`.`department_id` AS `department_id`,`" . env('DB_DATABASE') . "`.`sysdepartment`.`name` AS `department_id_txt`,`" . env('DB_DATABASE') . "`.`sysemployee`.`grade_id` AS `grade_id`,`" . env('DB_DATABASE') . "`.`sysgrade`.`name` AS `grade_id_txt`,`" . env('DB_DATABASE') . "`.`sysemployee`.`job_title` AS `job_title`,`" . env('DB_DATABASE') . "`.`sysemployee`.`email` AS `email`,`" . env('DB_DATABASE') . "`.`sysemployee`.`direct_id` AS `direct_id`,`direct`.`name` AS `direct_id_txt`,`" . env('DB_DATABASE') . "`.`sysemployee`.`indirect_id` AS `indirect_id`,`indirect`.`name` AS `indirect_id_txt`,`" . env('DB_DATABASE') . "`.`sysemployee`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysemployee`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysemployee`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysemployee`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysemployee`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysemployee`.`modified_by` AS `modified_by` from ((((`" . env('DB_DATABASE') . "`.`sysemployee` left join `" . env('DB_DATABASE') . "`.`sysdepartment` on(`" . env('DB_DATABASE') . "`.`sysemployee`.`department_id` = `" . env('DB_DATABASE') . "`.`sysdepartment`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`sysgrade` on(`" . env('DB_DATABASE') . "`.`sysemployee`.`grade_id` = `" . env('DB_DATABASE') . "`.`sysgrade`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`sysemployee` `direct` on(`" . env('DB_DATABASE') . "`.`sysemployee`.`direct_id` = `direct`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`sysemployee` `indirect` on(`" . env('DB_DATABASE') . "`.`sysemployee`.`indirect_id` = `indirect`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysemployeelist`");
    }
};
