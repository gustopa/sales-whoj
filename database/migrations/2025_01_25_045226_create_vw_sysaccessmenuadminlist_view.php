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
        DB::statement("CREATE VIEW `vw_sysaccessmenuadminlist` AS select 'Full control' AS `menu_access`,`" . env('DB_DATABASE') . "`.`sysmenu`.`name` AS `menu_name`,`" . env('DB_DATABASE') . "`.`sysmenu`.`name_bahasa` AS `menu_name_bahasa`,`" . env('DB_DATABASE') . "`.`sysmenu`.`controller_menu` AS `controller_menu`,`" . env('DB_DATABASE') . "`.`sysmenu`.`sequence` AS `menu_seq`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`name` AS `folder_name`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`name_bahasa` AS `folder_name_bahasa`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`icon` AS `folder_icon`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`sequence` AS `folder_seq` from (`" . env('DB_DATABASE') . "`.`sysmenu` join `" . env('DB_DATABASE') . "`.`sysfoldermenu` on(`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`row_id` = `" . env('DB_DATABASE') . "`.`sysmenu`.`foldermenu_id` and `" . env('DB_DATABASE') . "`.`sysfoldermenu`.`is_deleted` = 0)) where `" . env('DB_DATABASE') . "`.`sysmenu`.`is_deleted` = 0");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysaccessmenuadminlist`");
    }
};
