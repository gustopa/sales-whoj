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
        DB::statement("CREATE VIEW `vw_stock_diamondlist` AS select `" . env('DB_DATABASE') . "`.`stock_diamond`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`periode` AS `periode`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`input_type` AS `input_type`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`trans_date` AS `trans_date`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`diamond_type_id` AS `diamond_type_id`,`" . env('DB_DATABASE') . "`.`diamond_type`.`name` AS `diamond_type_id_txt`,`" . env('DB_DATABASE') . "`.`diamond_type`.`category` AS `diamond_type_id_category`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`pcs` AS `pcs`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`crt` AS `crt`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`stock_diamond` left join `" . env('DB_DATABASE') . "`.`diamond_type` on(`" . env('DB_DATABASE') . "`.`stock_diamond`.`diamond_type_id` = `" . env('DB_DATABASE') . "`.`diamond_type`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_stock_diamondlist`");
    }
};
