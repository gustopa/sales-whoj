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
        DB::statement("CREATE VIEW `vw_stock_gold_transactionlist` AS select `" . env('DB_DATABASE') . "`.`stock_gold`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`stock_gold`.`periode` AS `period`,`" . env('DB_DATABASE') . "`.`stock_gold`.`trans_date` AS `trans_date`,'' AS `trans_no`,'Input stok' AS `trans_name`,`" . env('DB_DATABASE') . "`.`stock_gold`.`input_type` AS `trans_type`,`" . env('DB_DATABASE') . "`.`stock_gold`.`txt` AS `trans_txt`,`" . env('DB_DATABASE') . "`.`stock_gold`.`gold_type_id` AS `gold_type_id`,`" . env('DB_DATABASE') . "`.`gold_type`.`name` AS `gold_type_id_txt`,`" . env('DB_DATABASE') . "`.`stock_gold`.`weight` AS `weight` from (`" . env('DB_DATABASE') . "`.`stock_gold` left join `" . env('DB_DATABASE') . "`.`gold_type` on(`" . env('DB_DATABASE') . "`.`stock_gold`.`gold_type_id` = `" . env('DB_DATABASE') . "`.`gold_type`.`row_id`)) where `" . env('DB_DATABASE') . "`.`stock_gold`.`is_deleted` = 0 and `" . env('DB_DATABASE') . "`.`stock_gold`.`is_submitted` = 1 union all select `a`.`row_id` AS `row_id`,`a`.`period` AS `period`,`a`.`trans_date` AS `trans_date`,`a`.`work_no` AS `trans_no`,'Pembuatan rangka' AS `trans_name`,`a`.`work_type` AS `trans_type`,`a`.`name` AS `trans_txt`,`a`.`gold_type_id` AS `gold_type_id`,`a`.`gold_type_id_txt` AS `gold_type_id_txt`,`a`.`weight` AS `weight` from `" . env('DB_DATABASE') . "`.`vw_production_frame_transactionlist` `a`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_stock_gold_transactionlist`");
    }
};
