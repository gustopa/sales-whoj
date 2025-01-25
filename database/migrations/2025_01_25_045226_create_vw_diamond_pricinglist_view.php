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
        DB::statement("CREATE VIEW `vw_diamond_pricinglist` AS select `" . env('DB_DATABASE') . "`.`diamond_pricing`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`diamond_type` AS `diamond_type`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`diamond_shape_id` AS `diamond_shape_id`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`size_from` AS `size_from`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`size_to` AS `size_to`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`price` AS `price`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`diamond_pricing`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`diamond_pricing`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_diamond_pricinglist`");
    }
};
