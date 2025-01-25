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
        DB::statement("CREATE VIEW `vw_sysfoldermenulist` AS select `" . env('DB_DATABASE') . "`.`sysfoldermenu`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`name_bahasa` AS `name_bahasa`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`icon` AS `icon`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`sequence` AS `sequence`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysfoldermenu`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`sysfoldermenu`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysfoldermenulist`");
    }
};
