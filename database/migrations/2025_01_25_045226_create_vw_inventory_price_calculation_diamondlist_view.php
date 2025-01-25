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
        DB::statement("CREATE VIEW `vw_inventory_price_calculation_diamondlist` AS select `inventory_diamond`.`line_id` AS `line_id`,`inventory_diamond`.`row_id` AS `row_id`,`inventory_diamond`.`company_id` AS `company_id`,`inventory_diamond`.`grain` AS `grain`,`inventory_diamond`.`grade` AS `grade`,`inventory_diamond`.`diamond_type` AS `diamond_type`,`inventory_diamond`.`no_sert` AS `no_sert`,`inventory_diamond`.`diameter` AS `diameter`,`inventory_diamond`.`color` AS `color`,`inventory_diamond`.`is_gia` AS `is_gia`,`inventory_diamond`.`amount` AS `amount`,`inventory_diamond`.`karat_perbutir` AS `karat_perbutir`,`inventory_diamond`.`harga_perbutir` AS `harga_perbutir`,`inventory_diamond`.`is_deleted` AS `is_deleted`,`inventory_diamond`.`created_date` AS `created_date`,`inventory_diamond`.`created_by` AS `created_by`,`inventory_diamond`.`modified_date` AS `modified_date`,`inventory_diamond`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`inventory_price_calculation_diamond` `inventory_diamond`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_inventory_price_calculation_diamondlist`");
    }
};
