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
        DB::statement("CREATE VIEW `vw_sysgroupapproval_employeelist` AS select `" . env('DB_DATABASE') . "`.`sysgroupapproval_employee`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`sysgroupapproval_employee`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysgroupapproval_employee`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysgroupapproval_employee`.`employee_id` AS `employee_id`,`" . env('DB_DATABASE') . "`.`sysemployee`.`name` AS `employee_id_txt`,`" . env('DB_DATABASE') . "`.`sysgroupapproval_employee`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysgroupapproval_employee`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysgroupapproval_employee`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysgroupapproval_employee`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysgroupapproval_employee`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`sysgroupapproval_employee` left join `" . env('DB_DATABASE') . "`.`sysemployee` on(`" . env('DB_DATABASE') . "`.`sysgroupapproval_employee`.`employee_id` = `" . env('DB_DATABASE') . "`.`sysemployee`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysgroupapproval_employeelist`");
    }
};
