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
        DB::statement("CREATE VIEW `vw_stock_goldlist` AS select `" . env('DB_DATABASE') . "`.`stock_gold`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`stock_gold`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`stock_gold`.`input_type` AS `input_type`,`" . env('DB_DATABASE') . "`.`stock_gold`.`periode` AS `periode`,`" . env('DB_DATABASE') . "`.`stock_gold`.`trans_date` AS `trans_date`,`" . env('DB_DATABASE') . "`.`stock_gold`.`gold_type_id` AS `gold_type_id`,`" . env('DB_DATABASE') . "`.`gold_type`.`name` AS `gold_type_id_txt`,`" . env('DB_DATABASE') . "`.`stock_gold`.`weight` AS `weight`,`" . env('DB_DATABASE') . "`.`stock_gold`.`txt` AS `txt`,`" . env('DB_DATABASE') . "`.`stock_gold`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`stock_gold`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`stock_gold`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`stock_gold`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`stock_gold`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`stock_gold`.`modified_by` AS `modified_by` from (`" . env('DB_DATABASE') . "`.`stock_gold` left join `" . env('DB_DATABASE') . "`.`gold_type` on(`" . env('DB_DATABASE') . "`.`stock_gold`.`gold_type_id` = `" . env('DB_DATABASE') . "`.`gold_type`.`row_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_stock_goldlist`");
    }
};
