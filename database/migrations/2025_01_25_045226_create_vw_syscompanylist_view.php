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
        DB::statement("CREATE VIEW `vw_syscompanylist` AS select `" . env('DB_DATABASE') . "`.`syscompany`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`syscompany`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`syscompany`.`address` AS `address`,`" . env('DB_DATABASE') . "`.`syscompany`.`phone` AS `phone`,`" . env('DB_DATABASE') . "`.`syscompany`.`email` AS `email`,`" . env('DB_DATABASE') . "`.`syscompany`.`pic` AS `pic`,`" . env('DB_DATABASE') . "`.`syscompany`.`file_logo` AS `file_logo`,`" . env('DB_DATABASE') . "`.`syscompany`.`color` AS `color`,`" . env('DB_DATABASE') . "`.`syscompany`.`is_active` AS `is_active`,`" . env('DB_DATABASE') . "`.`syscompany`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`syscompany`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`syscompany`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`syscompany`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`syscompany`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`syscompany`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`syscompany`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_syscompanylist`");
    }
};
