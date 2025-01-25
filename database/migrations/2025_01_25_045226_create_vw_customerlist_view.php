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
        DB::statement("CREATE VIEW `vw_customerlist` AS select `" . env('DB_DATABASE') . "`.`customer`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`customer`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`customer`.`customer_no` AS `customer_no`,`" . env('DB_DATABASE') . "`.`customer`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`customer`.`telp_no` AS `telp_no`,`" . env('DB_DATABASE') . "`.`customer`.`hp_bo` AS `hp_bo`,`" . env('DB_DATABASE') . "`.`customer`.`birth_date` AS `birth_date`,`" . env('DB_DATABASE') . "`.`customer`.`address` AS `address`,`" . env('DB_DATABASE') . "`.`customer`.`city` AS `city`,`" . env('DB_DATABASE') . "`.`customer`.`city_id` AS `city_id`,`" . env('DB_DATABASE') . "`.`city`.`city_name` AS `city_id_txt`,`" . env('DB_DATABASE') . "`.`customer`.`email` AS `email`,`" . env('DB_DATABASE') . "`.`customer`.`instagram` AS `instagram`,`" . env('DB_DATABASE') . "`.`customer`.`pi_no` AS `pi_no`,`" . env('DB_DATABASE') . "`.`customer`.`visit_date` AS `visit_date`,`" . env('DB_DATABASE') . "`.`customer`.`gender` AS `gender`,`" . env('DB_DATABASE') . "`.`customer`.`religion` AS `religion`,`" . env('DB_DATABASE') . "`.`customer`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`customer`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`customer`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`customer`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`customer`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`customer`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`customer` left join `" . env('DB_DATABASE') . "`.`city` on(`" . env('DB_DATABASE') . "`.`customer`.`city_id` = `" . env('DB_DATABASE') . "`.`city`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_customerlist`");
    }
};
