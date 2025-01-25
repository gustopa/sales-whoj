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
        DB::statement("CREATE VIEW `vw_sysaccesslist` AS select `" . env('DB_DATABASE') . "`.`sysaccess`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysaccess`.`role_id` AS `role_id`,`" . env('DB_DATABASE') . "`.`sysrole`.`name` AS `role_id_txt`,`" . env('DB_DATABASE') . "`.`sysaccess`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`sysaccess`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysaccess`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysaccess`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysaccess`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysaccess`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysaccess`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`sysaccess` left join `" . env('DB_DATABASE') . "`.`sysrole` on(`" . env('DB_DATABASE') . "`.`sysaccess`.`role_id` = `" . env('DB_DATABASE') . "`.`sysrole`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysaccesslist`");
    }
};
