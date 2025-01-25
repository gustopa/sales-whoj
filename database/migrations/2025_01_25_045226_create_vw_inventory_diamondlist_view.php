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
        DB::statement("CREATE VIEW `vw_inventory_diamondlist` AS select `" . env('DB_DATABASE') . "`.`inventory_diamond`.`line_id` AS `line_id`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`grain` AS `grain`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`grade` AS `grade`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`diamond_type` AS `diamond_type`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`no_sert` AS `no_sert`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`diameter` AS `diameter`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`color` AS `color`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`is_gia` AS `is_gia`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`amount` AS `amount`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`karat_perbutir` AS `karat_perbutir`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`harga_perbutir` AS `harga_perbutir`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`inventory_diamond`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`inventory_diamond`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_inventory_diamondlist`");
    }
};
