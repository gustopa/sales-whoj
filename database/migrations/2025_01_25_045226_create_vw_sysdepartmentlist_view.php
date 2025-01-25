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
        DB::statement("CREATE VIEW `vw_sysdepartmentlist` AS select `" . env('DB_DATABASE') . "`.`sysdepartment`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysdepartment`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`sysdepartment`.`division_id` AS `division_id`,`" . env('DB_DATABASE') . "`.`sysdivision`.`name` AS `division_id_txt`,`" . env('DB_DATABASE') . "`.`sysdepartment`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`sysdepartment`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysdepartment`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysdepartment`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysdepartment`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysdepartment`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysdepartment`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`sysdepartment` left join `" . env('DB_DATABASE') . "`.`sysdivision` on(`" . env('DB_DATABASE') . "`.`sysdepartment`.`division_id` = `" . env('DB_DATABASE') . "`.`sysdivision`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysdepartmentlist`");
    }
};
