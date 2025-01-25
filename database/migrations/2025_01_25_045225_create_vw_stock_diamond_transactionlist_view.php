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
        DB::statement("CREATE VIEW `vw_stock_diamond_transactionlist` AS select `" . env('DB_DATABASE') . "`.`stock_diamond`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`periode` AS `period`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`trans_date` AS `trans_date`,'' AS `trans_no`,'Input stok' AS `trans_name`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`input_type` AS `trans_type`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`txt` AS `trans_txt`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`diamond_type_id` AS `diamond_type_id`,concat(`" . env('DB_DATABASE') . "`.`diamond_type`.`name`,' ',`" . env('DB_DATABASE') . "`.`diamond_type`.`category`) AS `diamond_type_id_txt`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`pcs` AS `pcs`,`" . env('DB_DATABASE') . "`.`stock_diamond`.`crt` AS `crt` from (`" . env('DB_DATABASE') . "`.`stock_diamond` left join `" . env('DB_DATABASE') . "`.`diamond_type` on(`" . env('DB_DATABASE') . "`.`stock_diamond`.`diamond_type_id` = `" . env('DB_DATABASE') . "`.`diamond_type`.`row_id`)) where `" . env('DB_DATABASE') . "`.`stock_diamond`.`is_deleted` = 0 and `" . env('DB_DATABASE') . "`.`stock_diamond`.`is_submitted` = 1 union all select `a`.`row_id` AS `row_id`,`a`.`period` AS `period`,`a`.`trans_date` AS `trans_date`,`a`.`work_no` AS `trans_no`,'Pemasangan batu' AS `trans_name`,`a`.`work_type` AS `trans_type`,`a`.`name` AS `trans_txt`,`a`.`diamond_type_id` AS `diamond_type_id`,`a`.`diamond_type_id_txt` AS `diamond_type_id_txt`,`a`.`pcs` AS `pcs`,`a`.`crt` AS `crt` from `" . env('DB_DATABASE') . "`.`vw_production_diamond_transactionlist` `a`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_stock_diamond_transactionlist`");
    }
};
