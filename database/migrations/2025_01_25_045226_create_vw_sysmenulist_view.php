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
        DB::statement("CREATE VIEW `vw_sysmenulist` AS select `" . env('DB_DATABASE') . "`.`sysmenu`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysmenu`.`foldermenu_id` AS `foldermenu_id`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`name` AS `foldermenu_id_txt`,`" . env('DB_DATABASE') . "`.`sysmenu`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`sysmenu`.`name_bahasa` AS `name_bahasa`,`" . env('DB_DATABASE') . "`.`sysmenu`.`controller_menu` AS `controller_menu`,`" . env('DB_DATABASE') . "`.`sysmenu`.`sequence` AS `sequence`,`" . env('DB_DATABASE') . "`.`sysmenu`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysmenu`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysmenu`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysmenu`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysmenu`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysmenu`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`sysmenu` left join `" . env('DB_DATABASE') . "`.`sysfoldermenu` on(`" . env('DB_DATABASE') . "`.`sysmenu`.`foldermenu_id` = `" . env('DB_DATABASE') . "`.`sysfoldermenu`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysmenulist`");
    }
};
