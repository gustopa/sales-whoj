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
        DB::statement("CREATE VIEW `vw_sysaccess_linelist` AS select `" . env('DB_DATABASE') . "`.`sysaccess_line`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`sysaccess_line`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysaccess_line`.`menu_id` AS `menu_id`,`" . env('DB_DATABASE') . "`.`sysmenu`.`name` AS `menu_id_txt`,`" . env('DB_DATABASE') . "`.`sysaccess_line`.`menu_access` AS `menu_access`,`" . env('DB_DATABASE') . "`.`sysaccess_line`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysaccess_line`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysaccess_line`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysaccess_line`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysaccess_line`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`sysaccess_line` left join `" . env('DB_DATABASE') . "`.`sysmenu` on(`" . env('DB_DATABASE') . "`.`sysaccess_line`.`menu_id` = `" . env('DB_DATABASE') . "`.`sysmenu`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysaccess_linelist`");
    }
};
