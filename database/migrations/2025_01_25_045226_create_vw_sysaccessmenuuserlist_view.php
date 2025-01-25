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
        DB::statement("CREATE VIEW `vw_sysaccessmenuuserlist` AS select `" . env('DB_DATABASE') . "`.`sysuser`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysaccess_line`.`menu_access` AS `menu_access`,`" . env('DB_DATABASE') . "`.`sysmenu`.`name` AS `menu_name`,`" . env('DB_DATABASE') . "`.`sysmenu`.`name_bahasa` AS `menu_name_bahasa`,`" . env('DB_DATABASE') . "`.`sysmenu`.`controller_menu` AS `controller_menu`,`" . env('DB_DATABASE') . "`.`sysmenu`.`sequence` AS `menu_seq`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`name` AS `folder_name`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`name_bahasa` AS `folder_name_bahasa`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`icon` AS `folder_icon`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`sequence` AS `folder_seq` from (((((`" . env('DB_DATABASE') . "`.`sysuser` join `" . env('DB_DATABASE') . "`.`sysrole` on(`" . env('DB_DATABASE') . "`.`sysuser`.`role_id` = `" . env('DB_DATABASE') . "`.`sysrole`.`row_id` and `" . env('DB_DATABASE') . "`.`sysrole`.`is_deleted` = 0)) join `" . env('DB_DATABASE') . "`.`sysaccess` on(`" . env('DB_DATABASE') . "`.`sysaccess`.`role_id` = `" . env('DB_DATABASE') . "`.`sysrole`.`row_id` and `" . env('DB_DATABASE') . "`.`sysaccess`.`is_deleted` = 0)) join `" . env('DB_DATABASE') . "`.`sysaccess_line` on(`" . env('DB_DATABASE') . "`.`sysaccess_line`.`row_id` = `" . env('DB_DATABASE') . "`.`sysaccess`.`row_id` and `" . env('DB_DATABASE') . "`.`sysaccess_line`.`is_deleted` = 0)) join `" . env('DB_DATABASE') . "`.`sysmenu` on(`" . env('DB_DATABASE') . "`.`sysmenu`.`row_id` = `" . env('DB_DATABASE') . "`.`sysaccess_line`.`menu_id` and `" . env('DB_DATABASE') . "`.`sysmenu`.`is_deleted` = 0)) join `" . env('DB_DATABASE') . "`.`sysfoldermenu` on(`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`row_id` = `" . env('DB_DATABASE') . "`.`sysmenu`.`foldermenu_id` and `" . env('DB_DATABASE') . "`.`sysfoldermenu`.`is_deleted` = 0))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysaccessmenuuserlist`");
    }
};
